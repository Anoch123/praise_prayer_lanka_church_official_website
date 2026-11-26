
import EnrollmentForm from "@/components/forms/EnrollmentForm";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Student Enrollment Application | Heartland Theological Seminary",
  description:
    "Apply to Heartland Theological Seminary Sri Lanka Extension Programme.",
};

export default function EnrollmentPage() {
  return <EnrollmentForm fontClassName={lato.className} />;
}
