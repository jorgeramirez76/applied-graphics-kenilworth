// Typed loaders for the JSON content in /data.
// Everything the site renders comes from these files — no inline fabrication.
import siteSettings from '@data/site-settings.json';
import servicesData from '@data/services.json';
import projectsData from '@data/projects.json';
import clientsData from '@data/clients.json';
import reviewsData from '@data/reviews.json';
import serviceAreasData from '@data/service-areas.json';
import brandsData from '@data/brands.json';

export const site = siteSettings;

export type Service = (typeof servicesData)[number];
export const services: Service[] = servicesData;
export const getService = (slug: string) => services.find((s) => s.slug === slug);

export type Project = (typeof projectsData)[number];
export const projects: Project[] = projectsData;
export const projectsWithImages = projects.filter((p) => p.image);
export const projectCategories = Array.from(
  new Set(projects.map((p) => p.category)),
);

export const clients = clientsData;
export const reviews = reviewsData;
export const serviceAreas = serviceAreasData;
export const brands = brandsData;

// Convenience derived values
export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
export const telHref = `tel:${site.phone}`;

export function formatHours() {
  return site.hours.map((h) => {
    const closed = !h.open;
    const fmt = (t: string | null) => {
      if (!t) return '';
      const [hh, mm] = t.split(':').map(Number);
      const ampm = hh >= 12 ? 'PM' : 'AM';
      const h12 = hh % 12 === 0 ? 12 : hh % 12;
      return `${h12}:${mm.toString().padStart(2, '0')} ${ampm}`;
    };
    return {
      day: h.day,
      label: closed ? 'Closed' : `${fmt(h.open)} – ${fmt(h.close)}`,
      closed,
    };
  });
}

export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  site.mapsQuery,
)}&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.mapsQuery,
)}`;
