"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import convertHeic from "heic-convert";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import {
  createId,
  getApplications,
  getContent,
  saveApplications,
  saveContent,
  type DocumentItem,
  type GalleryItem,
  type NewsItem,
  type Program,
  type ScheduleClass,
  type Teacher,
  type Testimonial,
} from "@/lib/cms";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function requiredText(formData: FormData, key: string) {
  const value = text(formData, key);

  if (!value) {
    throw new Error(`Поле ${key} обовʼязкове`);
  }

  return value;
}

async function uploadFile(
  formData: FormData,
  key: string,
  folder: string,
  currentValue = "",
  optimizeImage = false,
) {
  const value = formData.get(key);

  if (!(value instanceof File) || value.size === 0) {
    return currentValue;
  }

  const extension = (path.extname(value.name) || ".bin").toLowerCase();
  const fileStem = `${Date.now()}-${crypto.randomUUID()}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  const bytes = Buffer.from(await value.arrayBuffer());

  await mkdir(uploadDir, { recursive: true });

  const optimizableExtensions = new Set([
    ".avif",
    ".bmp",
    ".heic",
    ".heif",
    ".jpeg",
    ".jpg",
    ".png",
    ".tif",
    ".tiff",
    ".webp",
  ]);

  if (optimizeImage && optimizableExtensions.has(extension)) {
    let source = bytes;
    let fallbackExtension = extension;

    if ([".heic", ".heif"].includes(extension)) {
      source = Buffer.from(
        await convertHeic({
          buffer: bytes,
          format: "JPEG",
          quality: 0.95,
        }),
      );
      fallbackExtension = ".jpg";
    }

    try {
      const optimizedName = `${fileStem}.webp`;
      const optimizedBuffer = await sharp(source, { failOn: "none" })
        .rotate()
        .resize({
          width: 2000,
          height: 2000,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 90, smartSubsample: true, effort: 5 })
        .toBuffer();

      await writeFile(path.join(uploadDir, optimizedName), optimizedBuffer);
      return `/uploads/${folder}/${optimizedName}`;
    } catch {
      const fallbackName = `${fileStem}${fallbackExtension}`;

      await writeFile(path.join(uploadDir, fallbackName), source);
      return `/uploads/${folder}/${fallbackName}`;
    }
  }

  if ([".heic", ".heif"].includes(extension)) {
    const previewName = `${fileStem}.jpg`;
    const previewBuffer = await convertHeic({
      buffer: bytes,
      format: "JPEG",
      quality: 0.95,
    });

    await writeFile(
      path.join(uploadDir, previewName),
      Buffer.from(previewBuffer),
    );
    return `/uploads/${folder}/${previewName}`;
  }

  const fileName = `${fileStem}${extension}`;

  await writeFile(path.join(uploadDir, fileName), bytes);

  return `/uploads/${folder}/${fileName}`;
}

export async function submitApplication(formData: FormData) {
  const parentName = requiredText(formData, "parentName");
  const phone = requiredText(formData, "phone");
  const message = text(formData, "message");
  const applications = await getApplications();

  applications.unshift({
    id: createId("request"),
    parentName,
    phone,
    message,
    status: "new",
    createdAt: new Date().toISOString(),
  });

  await saveApplications(applications);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function updateSettings(formData: FormData) {
  const content = await getContent();

  content.settings = {
    schoolName: requiredText(formData, "schoolName"),
    tagline: requiredText(formData, "tagline"),
    heroText: requiredText(formData, "heroText"),
    schedule: requiredText(formData, "schedule"),
    phone: requiredText(formData, "phone"),
    email: requiredText(formData, "email"),
    address: requiredText(formData, "address"),
  };

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function updateAudience(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");

  content.audiences = content.audiences.map((item) =>
    item.id === id
      ? {
          id,
          title: requiredText(formData, "title"),
          text: requiredText(formData, "text"),
        }
      : item,
  );

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function upsertProgram(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("program");
  const current = content.programs.find((program) => program.id === id);
  const item: Program = {
    id,
    title: requiredText(formData, "title"),
    description: requiredText(formData, "description"),
    imageUrl: await uploadFile(
      formData,
      "image",
      "programs",
      current?.imageUrl,
      true,
    ),
    fileUrl: await uploadFile(formData, "file", "programs", current?.fileUrl),
  };

  content.programs = content.programs.some((program) => program.id === id)
    ? content.programs.map((program) => (program.id === id ? item : program))
    : [...content.programs, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function deleteProgram(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.programs = content.programs.filter((program) => program.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function upsertTeacher(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("teacher");
  const current = content.teachers.find((teacher) => teacher.id === id);
  const item: Teacher = {
    id,
    name: requiredText(formData, "name"),
    role: requiredText(formData, "role"),
    initials: requiredText(formData, "initials").slice(0, 3).toUpperCase(),
    description: requiredText(formData, "description"),
    photoUrl: await uploadFile(
      formData,
      "photo",
      "teachers",
      current?.photoUrl,
      true,
    ),
  };

  content.teachers = content.teachers.some((teacher) => teacher.id === id)
    ? content.teachers.map((teacher) => (teacher.id === id ? item : teacher))
    : [...content.teachers, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function deleteTeacher(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.teachers = content.teachers.filter((teacher) => teacher.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function upsertDocument(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("document");
  const current = content.documents.find((document) => document.id === id);
  const fileUrl = await uploadFile(formData, "file", "documents", current?.fileUrl);
  const item: DocumentItem = {
    id,
    title: requiredText(formData, "title"),
    url: text(formData, "url") || fileUrl || "#",
    fileUrl,
  };

  content.documents = content.documents.some((document) => document.id === id)
    ? content.documents.map((document) =>
        document.id === id ? item : document,
      )
    : [...content.documents, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function deleteDocument(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.documents = content.documents.filter((document) => document.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function upsertGalleryItem(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("gallery");
  const current = content.gallery.find((galleryItem) => galleryItem.id === id);
  const item: GalleryItem = {
    id,
    title: requiredText(formData, "title"),
    color: current?.color || "#9bcf53",
    imageUrl: await uploadFile(
      formData,
      "image",
      "gallery",
      current?.imageUrl,
      true,
    ),
  };

  content.gallery = content.gallery.some((galleryItem) => galleryItem.id === id)
    ? content.gallery.map((galleryItem) =>
        galleryItem.id === id ? item : galleryItem,
      )
    : [...content.gallery, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function deleteGalleryItem(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.gallery = content.gallery.filter((galleryItem) => galleryItem.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function upsertNewsItem(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("news");
  const current = content.news.find((newsItem) => newsItem.id === id);
  const item: NewsItem = {
    id,
    title: requiredText(formData, "title"),
    date: requiredText(formData, "date"),
    excerpt: requiredText(formData, "excerpt"),
    imageUrl: await uploadFile(
      formData,
      "image",
      "news",
      current?.imageUrl,
      true,
    ),
    fileUrl: await uploadFile(formData, "file", "news", current?.fileUrl),
  };

  content.news = content.news.some((newsItem) => newsItem.id === id)
    ? content.news.map((newsItem) => (newsItem.id === id ? item : newsItem))
    : [item, ...content.news];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function deleteNewsItem(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.news = content.news.filter((newsItem) => newsItem.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function upsertScheduleClass(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("schedule");
  const item: ScheduleClass = {
    id,
    name: requiredText(formData, "name"),
    monday: text(formData, "monday"),
    tuesday: text(formData, "tuesday"),
    wednesday: text(formData, "wednesday"),
    thursday: text(formData, "thursday"),
    friday: text(formData, "friday"),
  };

  content.schedules = content.schedules.some((schedule) => schedule.id === id)
    ? content.schedules.map((schedule) =>
        schedule.id === id ? item : schedule,
      )
    : [...content.schedules, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function deleteScheduleClass(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.schedules = content.schedules.filter((schedule) => schedule.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function upsertTestimonial(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("testimonial");
  const item: Testimonial = {
    id,
    quote: requiredText(formData, "quote"),
    author: requiredText(formData, "author"),
  };

  content.testimonials = content.testimonials.some(
    (testimonial) => testimonial.id === id,
  )
    ? content.testimonials.map((testimonial) =>
        testimonial.id === id ? item : testimonial,
      )
    : [...content.testimonials, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function deleteTestimonial(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.testimonials = content.testimonials.filter(
    (testimonial) => testimonial.id !== id,
  );
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function updateApplicationStatus(formData: FormData) {
  const id = requiredText(formData, "id");
  const status = requiredText(formData, "status") === "done" ? "done" : "new";
  const applications = await getApplications();

  await saveApplications(
    applications.map((application) =>
      application.id === id ? { ...application, status } : application,
    ),
  );

  revalidatePath("/admin", "layout");
}

export async function deleteApplication(formData: FormData) {
  const id = requiredText(formData, "id");
  const applications = await getApplications();
  await saveApplications(
    applications.filter((application) => application.id !== id),
  );
  revalidatePath("/admin", "layout");
}
