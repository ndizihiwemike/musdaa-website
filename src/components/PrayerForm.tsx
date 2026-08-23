"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Heart, Loader2, CheckCircle2 } from "lucide-react";

export default function PrayerForm() {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const supabase = createClient();

    const { error: insertError } = await supabase
      .from("prayer_requests")
      .insert({
        name: isAnonymous ? null : name || null,
        request: request.trim(),
        is_anonymous: isAnonymous,
        is_public: isPublic,
        status: "pending",
      });

    if (insertError) {
      setError(
        insertError.message ||
          "Something went wrong. Please try again or contact a leader directly."
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setName("");
    setRequest("");
    setIsAnonymous(false);
    setIsPublic(false);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 sm:p-10 text-center">
        <div className="mx-auto inline-flex rounded-full bg-green-100 p-4 text-green-700">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-green-900">
          Prayer Request Received
        </h3>
        <p className="mt-2 text-green-800">
          Thank you. Our prayer team will be interceding for you. May God bless
          and keep you.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-medium text-green-700 hover:text-green-900 underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 sm:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
          <Heart className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Submit a Prayer Request
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name {isAnonymous && "(hidden)"}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isAnonymous}
            className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
            placeholder={isAnonymous ? "Anonymous" : "Your name"}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => {
              setIsAnonymous(e.target.checked);
              if (e.target.checked) setName("");
            }}
            className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
          />
          <label htmlFor="anonymous" className="text-sm text-gray-700">
            Submit anonymously
          </label>
        </div>

        <div>
          <label
            htmlFor="request"
            className="block text-sm font-medium text-gray-700"
          >
            Prayer Request <span className="text-red-500">*</span>
          </label>
          <textarea
            id="request"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            rows={5}
            required
            className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Share what is on your heart..."
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="public"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
          />
          <label htmlFor="public" className="text-sm text-gray-700">
            I am comfortable with this request being shared publicly (first name
            only, if provided)
          </label>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !request.trim()}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60 transition-colors"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Submitting..." : "Submit Prayer Request"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Your request is received by the prayer ministry team and kept with
          care.
        </p>
      </form>
    </div>
  );
}
