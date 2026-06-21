"use server";

import { revalidatePath } from "next/cache";
import {
  createId,
  getApplications,
  getContent,
  saveApplications,
  saveContent,
  type DocumentItem,
  type GalleryItem,
  type Program,
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
  revalidatePath("/admin");
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
  revalidatePath("/admin");
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
  revalidatePath("/admin");
}

export async function upsertProgram(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("program");
  const item: Program = {
    id,
    title: requiredText(formData, "title"),
    description: requiredText(formData, "description"),
  };

  content.programs = content.programs.some((program) => program.id === id)
    ? content.programs.map((program) => (program.id === id ? item : program))
    : [...content.programs, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProgram(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.programs = content.programs.filter((program) => program.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function upsertTeacher(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("teacher");
  const item: Teacher = {
    id,
    name: requiredText(formData, "name"),
    role: requiredText(formData, "role"),
    initials: requiredText(formData, "initials").slice(0, 3).toUpperCase(),
    description: requiredText(formData, "description"),
  };

  content.teachers = content.teachers.some((teacher) => teacher.id === id)
    ? content.teachers.map((teacher) => (teacher.id === id ? item : teacher))
    : [...content.teachers, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteTeacher(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.teachers = content.teachers.filter((teacher) => teacher.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function upsertDocument(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("document");
  const item: DocumentItem = {
    id,
    title: requiredText(formData, "title"),
    url: text(formData, "url") || "#",
  };

  content.documents = content.documents.some((document) => document.id === id)
    ? content.documents.map((document) =>
        document.id === id ? item : document,
      )
    : [...content.documents, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteDocument(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.documents = content.documents.filter((document) => document.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function upsertGalleryItem(formData: FormData) {
  const content = await getContent();
  const id = text(formData, "id") || createId("gallery");
  const item: GalleryItem = {
    id,
    title: requiredText(formData, "title"),
    color: text(formData, "color") || "#9bcf53",
  };

  content.gallery = content.gallery.some((galleryItem) => galleryItem.id === id)
    ? content.gallery.map((galleryItem) =>
        galleryItem.id === id ? item : galleryItem,
      )
    : [...content.gallery, item];

  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteGalleryItem(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.gallery = content.gallery.filter((galleryItem) => galleryItem.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
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
  revalidatePath("/admin");
}

export async function deleteTestimonial(formData: FormData) {
  const content = await getContent();
  const id = requiredText(formData, "id");
  content.testimonials = content.testimonials.filter(
    (testimonial) => testimonial.id !== id,
  );
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
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

  revalidatePath("/admin");
}

export async function deleteApplication(formData: FormData) {
  const id = requiredText(formData, "id");
  const applications = await getApplications();
  await saveApplications(
    applications.filter((application) => application.id !== id),
  );
  revalidatePath("/admin");
}
