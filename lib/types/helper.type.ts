import { LucideIcon } from "lucide-react";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterRow = {
  title: string;
  links: FooterLink[];
};

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type PageHeroCrumb = { label: string; href?: string };

export type PageHeroProps = {
  title: string;
  accent?: string;
  eyebrow?: string;
  description?: string;
  breadcrumbs?: PageHeroCrumb[];
  image?: string | null;
  align?: "left" | "center";
  showNavbar?: boolean;
  className?: string;
  isSermonVideoLength?: boolean;
  sermonVideoLength? : number;
};

export type ChurchEvent = {
  id: string;
  title: string;
  description: string;
  category: string;
  start: string;
  end?: string;
  allDay?: boolean;
  location: string;
  href?: string;
};

export type EventView = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  href?: string;
  monthLabel: string; // "November 2026"
  monthShort: string; // "Nov"
  day: string; // "06"
  weekday: string; // "Friday"
  timeLabel: string; // "7:00 PM – 9:00 PM" | "Dec 4 – Dec 6"
  gcalUrl: string;
};

export type WeeklyService = {
  id: number;
  name: string;
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  hour: number; // 24h
  minute: number;
  dayName: string;
  timeLabel: string;
};

export type Video = { id: string; title: string; date: string };

export type Status = "idle" | "sending" | "success" | "error";

export type Next = { name: string; when: string; secondsLeft: number; live: boolean };

export type Ministry = {
  slug: string;
  name: string;
  heroTitle: string;
  heroAccent: string;
  tagline: string;
  cardText: string;
  intro: string;
  about: string[];
  whatWeDo: { title: string; text: string }[];
  values: string[];
  verse: { text: string; ref: string };
  ages?: string;
  meets?: { day: string; time: string; place?: string };
};

export type Verse = {
  text: string;
  ref: string;
};

export type BandItem = {
  label: string;
  href?: string;
};

export type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED";

export interface EnrollmentResult {
    success: boolean;
    duplicate: boolean;
    application_id: string;
    reference_number: string;
  }
  
export interface EnrollmentApiResponse {
    success?: boolean;
    duplicate?: boolean;
    application_id?: string;
    reference_number?: string;
    error?: string;
    message?: string;
  }

export interface EnrollmentFormProps {
  fontClassName: string;
}

export type AdminRole =
  | "SUPER_ADMIN";

export interface AdminProfile {
  id: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
}

export interface AuthenticatedAdmin {
  id: string;
  email: string | undefined;
  profile: AdminProfile;
}

export interface Status_Admin_Dashboard {
  label: string;
  description: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export interface DashboardStats {
  totalApplications: number;
  submitted: number;
  underReview: number;
  accepted: number;
  rejected: number;
  withdrawn: number;
}

export interface SeminaryApplication {
  id: string;
  reference_number: string | null;
  full_name: string;
  email: string;
  mobile_whatsapp: string;
  programme_interest: string | null;
  status: ApplicationStatus;
  submitted_at: string;
  created_at: string;
  updated_at: string;
  nic_passport_number: string;

  selected_programmes: SeminaryApplicationProgramme[];
}

export interface AdminApplicationsFilters {
  search?: string;
  status?: ApplicationStatus | "ALL";
  programme?: string;
}

export interface AdminApplicationsResponse {
  applications: SeminaryApplication[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SeminaryApplicationDetails {
  id: string;
  reference_number: string | null;

  // Personal information
  full_name: string;
  date_of_birth: string;
  nic_passport_number: string | null;
  nationality: string | null;
  residential_address: string;
  district_city: string;
  postal_code: string | null;
  mobile_whatsapp: string;
  email: string;
  preferred_language: string | null;

  // Educational background
  highest_qualification: string;
  institution_name: string;
  year_completed: number | null;
  field_of_study: string | null;
  other_theological_training: string | null;

  // Programme preferences
  programme_interest: string | null;
  preferred_starting_period: string | null;
  heard_about_heartland: string | null;

  // Church and ministry
  current_church: string;
  denomination_affiliation: string | null;
  church_address: string;
  church_pastor_name: string | null;
  ministry_role: string | null;
  years_in_church_ministry: number | null;
  current_ministry_setting: string | null;

  // Spiritual background
  spiritual_background: string;
  theological_study_purpose: string | null;

  // Declaration
  declaration_accepted: boolean;
  declaration_signed_name: string;
  declaration_date: string;

  // Administration
  status: ApplicationStatus;
  internal_notes: string | null;
  submitted_at: string;
  created_at: string;
  updated_at: string;

  selected_programmes: SeminaryApplicationProgramme[];
}

export interface SeminaryApplicationProgramme {
  application_id: string;
  programme_code: string;
  programme_label: string;
  created_at: string;
}

export interface UseAdminApplicationReturn {
  application: SeminaryApplicationDetails | null;
  isLoading: boolean;
  error: string | null;
  refreshApplication: () => Promise<void>;
}

export interface AdminApplicationApiResponse {
  application?: SeminaryApplicationDetails | null;
  error?: string;
  message?: string;
}

export interface AdminApplicationStatusCounts {
  ALL: number;
  SUBMITTED: number;
  UNDER_REVIEW: number;
  ACCEPTED: number;
  REJECTED: number;
}

export interface AdminApplicationsResponse {
  applications: SeminaryApplication[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  statusCounts: AdminApplicationStatusCounts;
}
