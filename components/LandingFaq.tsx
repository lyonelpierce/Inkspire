"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const LandingFaq = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-semibold mb-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          Frequent{" "}
        </span>
        Asked Questions
      </h2>
      <div className="flex flex-col gap-5 items-center justify-center sm:flex-row sm:justify-center">
        <Accordion type="single" collapsible className="w-full text-white">
          <AccordionItem value="item-1">
            <AccordionTrigger aria-controls="q1" id="t1">
              What are tokens, and how do they work?
            </AccordionTrigger>
            <AccordionContent id="q1" aria-labelledby="t1">
              Tokens are used to generate images on the platform. Two image
              tokens are approximately worth one standard 512x512 image
              generated at 30 steps. This means that if you have 20 image
              tokens, you can generate 10 images on the platform.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger aria-controls="q2" id="t2">
              How often do tokens reset?
            </AccordionTrigger>
            <AccordionContent id="q2" aria-labelledby="t2">
              <p>
                If you are using the free plan, a limited number of tokens will
                be allocated to you each day, and will reset daily at midnight.
                This means that you can generate a limited number of images each
                day, based on the number of tokens allocated to you. Free tier
                users are also limited to a lower number of simultaneous
                generations, and 512x512 resolution.
              </p>
              <br></br>
              <p>
                If you are on a paid plan of the platform, you will have access
                to your full monthly token allowance at any time, and your
                allowance will reset each month. This means that you can use
                your tokens at your own pace and have access to the platform’s
                premium features, throughout the month.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger aria-controls="q3" id="t3">
              Can I use my generations for commercial projects?
            </AccordionTrigger>
            <AccordionContent id="q3" aria-labelledby="t3">
              <p>
                Yes, if you are on a free plan you can use any public saved
                generation for your projects.
              </p>
              <p>
                If you are in pro plan, any private saved generation belong to
                the person who has generated it
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger aria-controls="q4" id="t4">
              What happens if I run out of tokens in my paid plan?
            </AccordionTrigger>
            <AccordionContent id="q4" aria-labelledby="t4">
              <p>
                You can always wait for the end of the month for the tokens to
                replenish, or upgrade to the next plan if you are running out of
                tokens (upgrades coming soon). Contact us if you are looking for
                a custom plan.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger aria-controls="q5" id="t5">
              Can I change my plan later?
            </AccordionTrigger>
            <AccordionContent id="q5" aria-labelledby="t5">
              You will be able to upgrade or downgrade your plan in the very
              near future.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger aria-controls="q6" id="t6">
              Does the pricing include tax?
            </AccordionTrigger>
            <AccordionContent id="q6" aria-labelledby="t6">
              Any Plan above the Free Plan excludes tax. Tax, if applicable,
              will be added at the point of payment with Stripe
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
