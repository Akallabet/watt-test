export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Deployment Test</h1>
        <p className="text-slate-400 text-lg">
          Minimal Watt application for DigitalOcean deployment testing
        </p>
        <div className="mt-8 p-4 bg-slate-700/50 rounded-lg">
          <p className="text-slate-300 text-sm">
            API Health Check:{' '}
            <a
              href="/api/data/health"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              /api/data/health
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
