import { useAtomsDebugValue } from "jotai-devtools"
import { BrowserRouter as Router } from "react-router-dom"
import Footer from "./modules/ui/Footer.tsx"
import Header from "./modules/ui/Header.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"

const App = () => {
  useAtomsDebugValue()

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
