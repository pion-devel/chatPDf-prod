import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const { userId, user } = await auth();

  const userName = user?.firstName;

  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  const pricingItems = [
    {
      plan: "Gratis",
      tagline: "Per progetti piccoli",
      quota: 10,
      prezzo: 0,
      features: [
        {
          text: "5 pagine per PDF",
          footnote: "Il numero massimo di pagine per file PDF",
        },
        {
          text: "Limite di dimensione del file di 4 MB",
          footnote: "La dimensione massima di un singolo file PDF.",
        },
        {
          text: "Interfaccia Mobile-friendly",
        },
        {
          text: "Risposte di maggiore qualità",
          footnote:
            "Ottimizzazione delle risposte algoritmiche per un miglioramento della qualità del contenuto",
          negative: true,
        },
        {
          text: "Assistenza prioritaria.",
          negative: true,
        },
      ],
    },
    {
      plan: "Pro",
      tagline: "Per progetti più grandi con esigenze maggiori.",
      quota: 10,
      prezzo: 10,
      features: [
        {
          text: "25 pagine per PDF",
          footnote: "Il numero massimo di pagine per file PDF",
        },
        {
          text: "Limite di dimensione del file di 16 MB",
          footnote: "La dimensione massima di un singolo file PDF.",
        },
        {
          text: "Interfaccia Mobile-friendly",
        },
        {
          text: "Risposte di maggiore qualità",
          footnote:
            "Ottimizzazione delle risposte algoritmiche per un miglioramento della qualità del contenuto",
        },
        {
          text: "Assistenza prioritaria.",
        },
      ],
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col items-center text-center">
        <div className="flex w-full items-center px-60 mt-20">
          <div className="">
            {/*<h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>*/}
            <UserButton afterSignOutUrl="/" />
            <p>{userName}</p>
          </div>

          <div className="flex  pl-96 ">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    I miei chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )}
          </div>
        </div>

        {!isAuth ? (
          <>
            <div className="mb-9 mt-10 sm:mt-16 flex flex-col items-center justify-center text-center">
              <div className="mx-auto mb-9  flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-3 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
                <p className="text-sm  font-bold text-gray-700">
                  Copimo è ora pubblico!
                </p>
              </div>
              <h1 className="max-w-4xl mt-3 text-5xl font-bold md:text-6xl lg:text-7xl">
                Chatta con i tuoi{" "}
                <span className="text-blue-600">documenti</span> in pochi
                secondi.
              </h1>
              <p className="mt-10 mb-3 max-w-prose text-zinc-700 sm:text-lg">
                Copimo è uno strumento creato appositamente per gli studenti che
                consente di interagire con i file PDF attraverso l&apos;uso
                dell&apos;Intelligenza Artificiale. Carica semplicemente il tuo
                file e inizia a fare domande immediatamente.
              </p>
              <div className="mt-6"></div>
              <Link href="/sign-in">
                <Button>
                  Inizia ora
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div>
              <div className="relative isolate">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                  <div
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  />
                </div>

                <div>
                  <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mt-16 flow-root sm:mt-24">
                      <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <Image
                          src="/dashboard-preview.jpg"
                          alt="product preview"
                          width={1364}
                          height={866}
                          quality={100}
                          className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                  <div
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
                  />
                </div>
              </div>
            </div>

            <div className="mx-auto mb-32 mt-20 max-w-5xl sm:mt-40">
              <div className="mb-12 px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                  <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
                    Inizia a chattare in pochi secondi.
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Chattare con i tuoi file PDF non è mai stato così facile
                    come con Copimo.
                  </p>
                </div>
              </div>

              {/* steps */}
              <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
                <li className="md:flex-1">
                  <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-blue-600">
                      Step 1
                    </span>
                    <span className="text-xl font-semibold">
                      Crea un account
                    </span>
                    <span className="mt-2 text-zinc-700">
                      Puoi cominciare con un piano gratuito o selezionare il
                      nostro{" "}
                      <Link
                        href="/pricing"
                        className="text-blue-700 underline underline-offset-2"
                      >
                        piano Pro
                      </Link>
                      .
                    </span>
                  </div>
                </li>
                <li className="md:flex-1">
                  <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-blue-600">
                      Step 2
                    </span>
                    <span className="text-xl font-semibold">
                      Carica il tuo file PDF
                    </span>
                    <span className="mt-2 text-zinc-700">
                      Il tuo file verrà elaborato e sarà pronto per una
                      conversazione.
                    </span>
                  </div>
                </li>
                <li className="md:flex-1">
                  <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-blue-600">
                      Step 3
                    </span>
                    <span className="text-xl font-semibold">
                      Inizia a fare domande
                    </span>
                    <span className="mt-2 text-zinc-700">
                      È proprio così facile. Prova Copimo oggi stesso,
                      impiegherai meno di un minuto.
                    </span>
                  </div>
                </li>
              </ol>

              <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="mt-16 flow-root sm:mt-24">
                  <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <Image
                      src="/file-upload-preview.jpg"
                      alt="uploading preview"
                      width={1419}
                      height={732}
                      quality={100}
                      className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full mt-8 mb-10 px-60 ">
            <FileUpload />
          </div>
        )}
        {/** 
          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>
*/}
        {/*
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

            */}

        <>
          <div className=" mt-22 mb-28 text-center max-w-5xl">
            <div className="mx-auto mb-10 sm:max-w-lg">
              <h1 className="text-6xl font-bold sm:text-7xl">Prezzo</h1>
              <p className="mt-5 text-gray-600 sm:text-lg">
                Sia che tu stia solo testando Copimo o ne abbia bisogno in modo
                più approfondito, siamo pronti a soddisfare tutte le tue
                esigenze.
              </p>
            </div>

            <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
              {pricingItems.map(
                ({ plan, tagline, quota, features, prezzo }) => {
                  const price = 10;

                  return (
                    <div
                      key={plan}
                      className={"relative rounded-2xl bg-white shadow-lg"}
                    >
                      {plan === "Pro" && (
                        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
                          Piano Pro
                        </div>
                      )}

                      <div className="p-5">
                        <h3 className="my-3 text-center font-display text-3xl font-bold">
                          {plan}
                        </h3>
                        <p className="text-gray-500">{tagline}</p>
                        <p className="my-5 font-display text-6xl font-semibold">
                          €{prezzo}
                        </p>
                        <p className="text-gray-500">al mese</p>
                      </div>

                      <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center space-x-1">
                          <p>{quota.toLocaleString()} PDFs/m included</p>
                        </div>
                      </div>

                      <ul className="my-10 space-y-5 px-8">
                        {features.map(({ text, footnote, negative }) => (
                          <li key={text} className="flex space-x-5">
                            <div className="flex-shrink-0"></div>
                            {footnote ? (
                              <div className="flex items-center space-x-1">
                                <p>{text}</p>
                              </div>
                            ) : (
                              <p>{text}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-gray-200" />
                      <div className="p-5">
                        {plan === "Free" ? (
                          <Link href={user ? "/dashboard" : "/sign-in"}>
                            {user ? "Effettua l'upgrade adesso" : "Iscriviti"}
                            <ArrowRight className="h-5 w-5 ml-1.5" />
                          </Link>
                        ) : user ? (
                          <div>frfr</div>
                        ) : (
                          <Link href="/sign-in">
                            <Button>
                              Inizia ora
                              <LogIn className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
