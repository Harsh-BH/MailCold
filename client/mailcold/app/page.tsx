import ColdMailForm from "./components/ColdMailForm"

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center animate-fade-in animate-float">
        Cold Mail Generator
      </h1>
      <div
        className="w-full max-w-2xl bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-8 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <ColdMailForm />
      </div>
    </main>
  )
}

