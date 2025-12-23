"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Settings, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import gsap from "gsap";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      // Apply saved preferences
      applyCookiePreferences(savedPreferences);
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Here you would integrate with your analytics/marketing tools
    if (prefs.analytics) {
      // Enable analytics (e.g., Google Analytics)
      console.log("Analytics cookies enabled");
    }
    if (prefs.marketing) {
      // Enable marketing cookies (e.g., Facebook Pixel)
      console.log("Marketing cookies enabled");
    }
  };

  const acceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allPreferences);
    localStorage.setItem("cookie-consent", JSON.stringify(allPreferences));
    applyCookiePreferences(allPreferences);
    animateOut();
  };

  const acceptEssentialOnly = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem("cookie-consent", JSON.stringify(essentialOnly));
    applyCookiePreferences(essentialOnly);
    animateOut();
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    applyCookiePreferences(preferences);
    setShowPreferences(false);
    animateOut();
  };

  const animateOut = () => {
    gsap.to(".cookie-banner", {
      y: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => setShowBanner(false),
    });
  };

  const updatePreference = (category: keyof CookiePreferences, value: boolean) => {
    if (category === "essential") return; // Essential cannot be disabled
    setPreferences(prev => ({ ...prev, [category]: value }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div className="cookie-banner max-w-4xl mx-auto">
        {!showPreferences ? (
          // Main Banner - Streamlined Design
          <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-[var(--color-ortecha-main)] rounded-full flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content & Actions in single flow */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      Cookies & Your Privacy
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">
                      We use cookies to enhance your experience and analyze site traffic.
                    </p>
                    <div className="flex gap-3 text-xs">
                      <Link
                        href="/cookies"
                        className="text-[var(--color-ortecha-main)] hover:text-[var(--color-ortecha-dark-red)] font-medium transition-colors underline"
                      >
                        Cookie Policy
                      </Link>
                      <Link
                        href="/privacy"
                        className="text-[var(--color-ortecha-main)] hover:text-[var(--color-ortecha-dark-red)] font-medium transition-colors underline"
                      >
                        Privacy Policy
                      </Link>
                    </div>
                  </div>

                  {/* Actions - horizontal on all screens */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 font-medium rounded-md hover:border-[var(--color-ortecha-main)] hover:text-[var(--color-ortecha-main)] transition-all"
                    >
                      Manage
                    </button>
                    <button
                      onClick={acceptEssentialOnly}
                      className="px-3 py-1.5 text-xs bg-gray-100 text-gray-900 font-medium rounded-md hover:bg-gray-200 transition-all"
                    >
                      Essential Only
                    </button>
                    <button
                      onClick={acceptAll}
                      className="px-4 py-1.5 text-xs bg-[var(--color-ortecha-main)] text-white font-semibold rounded-md hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-sm hover:shadow-md"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Preferences Panel - Compact Design
          <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-4 md:p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-semibold text-gray-900">Essential Cookies</h4>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-3 h-3" />
                    <span className="text-xs font-medium">Always Active</span>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-semibold text-gray-900">Analytics Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference("analytics", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-ortecha-main)]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-ortecha-main)]"></div>
                  </label>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Help us understand how visitors interact with our site to improve performance.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-semibold text-gray-900">Marketing Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => updatePreference("marketing", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-ortecha-main)]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-ortecha-main)]"></div>
                  </label>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Used by advertising partners to show relevant ads based on your interests.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={acceptEssentialOnly}
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[var(--color-ortecha-main)] hover:text-[var(--color-ortecha-main)] transition-all"
                >
                  Essential Only
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-all"
                >
                  Accept All
                </button>
                <button
                  onClick={savePreferences}
                  className="px-6 py-2 text-sm bg-[var(--color-ortecha-main)] text-white font-semibold rounded-lg hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-sm hover:shadow-md"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
