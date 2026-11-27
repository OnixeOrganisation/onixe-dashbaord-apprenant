"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { ArrowLeft, CheckCircle2, KeyRound, Loader2, Mail, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function LoginForm() {
  const router = useRouter();

  const [step, setStep] = React.useState<"email" | "otp">("email");
  const [email, setEmail] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [otpCode, setOtpCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);
  const [cooldown, setCooldown] = React.useState(0);

  React.useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("onixe_apprenant_remembered_email");
      if (savedEmail) {
        setEmail(savedEmail);
      }
    } catch {
      // Ignored if localStorage is unavailable
    }
  }, []);

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      toast.error("Adresse e-mail invalide", {
        description: "Veuillez saisir une adresse e-mail valide.",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (remember) {
        localStorage.setItem("onixe_apprenant_remembered_email", trimmedEmail);
      } else {
        localStorage.removeItem("onixe_apprenant_remembered_email");
      }

      setCooldown(60);
      setStep("otp");
      setOtpCode("");

      toast.success("Code de sécurité envoyé", {
        description: `Un code de vérification à 6 chiffres a été envoyé à ${trimmedEmail}.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0 || isResending) return;

    setIsResending(true);
    try {
      setCooldown(60);
      toast.success("Nouveau code envoyé", {
        description: `Un nouveau code à 6 chiffres a été envoyé à ${email}.`,
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOtp = async (codeToVerify?: string) => {
    const finalCode = (codeToVerify ?? otpCode).trim();
    if (finalCode.length !== 6) {
      toast.error("Code incomplet", {
        description: "Veuillez saisir les 6 chiffres reçus par e-mail.",
      });
      return;
    }

    setIsLoading(true);
    try {
      toast.success("Authentification réussie", {
        description: "Accès à votre espace apprenant...",
      });
      router.push("/dashboard/accueil");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "otp") {
    return (
      <div className="flex flex-col gap-4">
        <div className="space-y-4 rounded-lg border bg-card p-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 font-semibold text-foreground text-sm">
              <KeyRound className="size-4 text-primary" />
              <span>Saisir le code de sécurité</span>
            </div>
            <p className="text-muted-foreground text-xs">
              Consultez votre boîte de réception <strong className="text-foreground">{email}</strong>
            </p>
          </div>

          <div className="flex justify-center py-2">
            <InputOTP
              maxLength={6}
              value={otpCode}
              onChange={(value) => {
                setOtpCode(value);
                if (value.length === 6) {
                  void handleVerifyOtp(value);
                }
              }}
              disabled={isLoading}
            >
              <InputOTPGroup className="gap-1.5 sm:gap-2">
                <InputOTPSlot index={0} className="size-10 rounded-md border font-bold text-base sm:size-11" />
                <InputOTPSlot index={1} className="size-10 rounded-md border font-bold text-base sm:size-11" />
                <InputOTPSlot index={2} className="size-10 rounded-md border font-bold text-base sm:size-11" />
                <InputOTPSlot index={3} className="size-10 rounded-md border font-bold text-base sm:size-11" />
                <InputOTPSlot index={4} className="size-10 rounded-md border font-bold text-base sm:size-11" />
                <InputOTPSlot index={5} className="size-10 rounded-md border font-bold text-base sm:size-11" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            type="button"
            className="w-full gap-2"
            disabled={isLoading || otpCode.length !== 6}
            onClick={() => handleVerifyOtp()}
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
            Confirmer et se connecter
          </Button>

          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtpCode("");
              }}
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3" />
              Changer d&apos;adresse e-mail
            </button>

            {cooldown > 0 ? (
              <span className="text-[11px] text-muted-foreground">Renvoyer dans {cooldown}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="flex items-center gap-1 font-medium text-primary hover:underline"
              >
                <RefreshCw className={`size-3 ${isResending ? "animate-spin" : ""}`} />
                Renvoyer le code
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSendOtp} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Field className="gap-1.5">
          <FieldLabel htmlFor="login-email">Adresse e-mail</FieldLabel>
          <div className="relative">
            <Mail className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="apprenant@onixe.org"
              autoComplete="email"
              disabled={isLoading}
              className="pl-9"
              required
            />
          </div>
        </Field>

        <Field orientation="horizontal">
          <Checkbox
            id="login-remember"
            checked={remember}
            onCheckedChange={(checked) => setRemember(Boolean(checked))}
            disabled={isLoading}
          />
          <FieldContent>
            <FieldLabel htmlFor="login-remember" className="font-normal text-muted-foreground text-xs">
              Mémoriser mon adresse e-mail sur cet appareil
            </FieldLabel>
          </FieldContent>
        </Field>
      </FieldGroup>

      <Button className="w-full gap-2" type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
        Envoyer le code de sécurité
      </Button>
    </form>
  );
}
