"use client";

import * as z from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/Heading";
import { PenTool, Save, Share } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  formSchema,
  amountOptions,
  styleOptions,
  resolutionOptions,
} from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import SkeletonDark from "@/components/SkeletonDark";

const Generator = () => {
  const [isPro, setIsPro] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch("/api/subscription", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsPro(data.isPro);
        } else {
          setIsPro(false);
        }
      } catch (error) {
        setIsPro(false);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      style: "watercolor",
      amount: "1",
      resolution: "512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const calculateTokens = (amount: string, resolution: string): number => {
    const imagesCount = parseInt(amount, 10);
    const resolutionValue = parseInt(resolution, 10);

    if (resolutionValue === 512) {
      return imagesCount * 2;
    } else if (resolutionValue === 768) {
      return imagesCount * 3;
    } else if (resolutionValue === 1024) {
      return imagesCount * 4;
    } else {
      return imagesCount * 2;
    }
  };

  const isOptionDisabledForNonPro = (value: string) => {
    if (!isPro) {
      if (value === "3" || value === "4") {
        return true;
      }

      if (value === "768" || value === "1024") {
        return true;
      }
    }

    return false;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 201) {
        proModal.onOpen();
        return;
      }

      setImages([]);

      const data = await response.json();
      const urls = data.imageUrl.map((image: { url: string }) => image.url);

      setImages(urls);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  const handleSave = async (
    imageUrl: string,
    imagePrompt: string,
    imageStyle: string,
    imageStatus: boolean
  ) => {
    const data = {
      imageUrl,
      imagePrompt,
      imageStyle,
      imageStatus,
    };
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        toast.success("Shared & Saved!");
      } else {
        toast.error("Image already saved.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const selectedAmount = form.watch("amount");

  return (
    <div>
      <Heading
        title="Tattoo Generation"
        description="Turn your prompt into a tattoo design"
        icon={PenTool}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/30"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              id="generatorForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-6 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 border-0 bg-[#171717] space-y-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-12">
                    <FormLabel
                      className="text-xs text-white"
                      id="promptLabel"
                      htmlFor="promptInput"
                    >
                      Prompt
                    </FormLabel>
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 bg-[#202020] outline-none focus-visible:ring-0 focus-visible:ring-transparent px-2 text-white"
                        disabled={isLoading}
                        placeholder="Elon Musk eating a banana while riding a unicorn"
                        {...field}
                        id="promptInput"
                        aria-describedby="description"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <FormLabel
                      className="text-xs text-white"
                      htmlFor="styleInput"
                    >
                      Style
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger aria-controls="styleInput">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {styleOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="cursor-pointer"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <FormLabel
                      className="text-xs text-white"
                      htmlFor="amountInput"
                    >
                      Number of Images
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) => {
                        if (isOptionDisabledForNonPro(value)) {
                          proModal.onOpen();
                        } else {
                          field.onChange(value);
                        }
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger aria-controls="amountInput">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {amountOptions.map((option) => {
                          const isDisabled = isOptionDisabledForNonPro(
                            option.value
                          );

                          return (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="cursor-pointer"
                            >
                              {isDisabled ? (
                                <>
                                  {option.label}
                                  <Badge
                                    variant="premium"
                                    className="uppercase text-xs py-1 ml-1"
                                  >
                                    Pro
                                  </Badge>
                                </>
                              ) : (
                                option.label
                              )}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <FormLabel
                      className="text-xs text-white"
                      htmlFor="resolutionInput"
                    >
                      Resolution
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) => {
                        if (isOptionDisabledForNonPro(value)) {
                          proModal.onOpen();
                        } else {
                          field.onChange(value);
                        }
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger aria-controls="resolutionInput">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {resolutionOptions.map((option) => {
                          const isDisabled = isOptionDisabledForNonPro(
                            option.value
                          );

                          return (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="cursor-pointer"
                            >
                              {isDisabled ? (
                                <>
                                  {option.label}
                                  <Badge
                                    variant="premium"
                                    className="uppercase text-xs py-1 ml-1"
                                  >
                                    Pro
                                  </Badge>
                                </>
                              ) : (
                                option.label
                              )}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormItem
                className="col-span-12 lg:col-span-3"
                id="tokenCalculation"
              >
                <FormLabel
                  className="text-xs text-white"
                  htmlFor="submitButton"
                >
                  This will use{" "}
                  {calculateTokens(
                    form.watch("amount"),
                    form.watch("resolution")
                  )}{" "}
                  tokens
                </FormLabel>
                <Button
                  id="submitButton"
                  className="col-span-12 lg:col-span-2 w-full"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Generate
                </Button>
              </FormItem>
            </form>
          </Form>
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {[...Array(parseInt(selectedAmount, 10))].map((_, index) => (
                <SkeletonDark key={index} />
              ))}
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated." />
          )}
          <div
            className={
              isLoading
                ? "hidden"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8"
            }
          >
            {images.map((src) => (
              <Card
                key={src}
                className="rounded-lg overflow-hidden bg-[#171717] border-0"
              >
                <div className="relative aspect-square">
                  <Image height={512} width={512} alt="Generated" src={src} />
                </div>
                <CardFooter className="p-2 gap-2">
                  <Button
                    onClick={() =>
                      handleSave(
                        src,
                        form.getValues("prompt"),
                        form.getValues("style"),
                        true
                      )
                    }
                    variant="default"
                    className="w-full"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Public Save
                  </Button>
                  <Button
                    onClick={() => {
                      if (isPro) {
                        handleSave(
                          src,
                          form.getValues("prompt"),
                          form.getValues("style"),
                          false
                        );
                      } else {
                        proModal.onOpen();
                      }
                    }}
                    variant="outline"
                    className="w-full bg-[#202020] border-0 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Private Save
                    {isPro ? null : (
                      <Badge
                        variant="premium"
                        className="uppercase text-xs py-1 ml-1"
                      >
                        Pro
                      </Badge>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Generator;
