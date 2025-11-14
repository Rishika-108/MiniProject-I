// "use client"

// import type React from "react"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { DashboardSidebar } from "@/components/dashboard-sidebar"
// import { DashboardHeader } from "@/components/dashboard-header"
// import { KnowledgeCard } from "@/components/knowledge-card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Search, Sparkles } from "lucide-react"

// interface KnowledgeItem {
//   title: string
//   description: string
//   image?: string
//   category: string
//   link?: string
//   metadata?: {
//     year?: string
//     rating?: string
//     genre?: string
//   }
// }

// export default function KnowledgePage() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [results, setResults] = useState<KnowledgeItem[]>([])
//   const [isSearching, setIsSearching] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     const auth = localStorage.getItem("jarvis-auth")
//     if (!auth) {
//       router.push("/login")
//       return
//     }
//     setIsAuthenticated(true)
//   }, [router])

//   const knowledgeDatabase: KnowledgeItem[] = [
//     {
//       title: "Elon Musk",
//       description:
//         "Business magnate and entrepreneur known for Tesla, SpaceX, and other innovative companies. Focused on sustainable energy and space exploration.",
//       image: "/elon-musk-portrait.png",
//       category: "Person",
//       link: "https://en.wikipedia.org/wiki/Elon_Musk",
//       metadata: { year: "Born 1971" },
//     },
//     {
//       title: "Steve Jobs",
//       description:
//         "Co-founder and former CEO of Apple Inc., known for revolutionizing personal computing and mobile technology.",
//       image: "/thoughtful-innovator-portrait.png",
//       category: "Person",
//       link: "https://en.wikipedia.org/wiki/Steve_Jobs",
//       metadata: { year: "1955-2011" },
//     },
//     {
//       title: "The Matrix",
//       description: "A 1999 science fiction action film about a computer hacker who discovers reality is a simulation.",
//       image: "/matrix-movie-poster.png",
//       category: "Movie",
//       link: "https://en.wikipedia.org/wiki/The_Matrix",
//       metadata: { year: "1999", rating: "8.7/10", genre: "Sci-Fi" },
//     },
//     {
//       title: "Artificial Intelligence",
//       description:
//         "The simulation of human intelligence in machines that are programmed to think and learn like humans.",
//       category: "Technology",
//       link: "https://en.wikipedia.org/wiki/Artificial_intelligence",
//     },
//     {
//       title: "SpaceX",
//       description: "American aerospace manufacturer and space transportation company founded by Elon Musk in 2002.",
//       category: "Company",
//       link: "https://en.wikipedia.org/wiki/SpaceX",
//       metadata: { year: "Founded 2002" },
//     },
//     {
//       title: "Quantum Computing",
//       description: "A type of computation that harnesses quantum mechanical phenomena to process information.",
//       category: "Technology",
//       link: "https://en.wikipedia.org/wiki/Quantum_computing",
//     },
//   ]

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return

//     setIsSearching(true)

//     // Simulate search delay
//     setTimeout(() => {
//       const filtered = knowledgeDatabase.filter(
//         (item) =>
//           item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.category.toLowerCase().includes(searchQuery.toLowerCase()),
//       )
//       setResults(filtered)
//       setIsSearching(false)
//     }, 1000)
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSearch()
//     }
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Authenticating...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex">
//       <DashboardSidebar />

//       <div className="flex-1 flex flex-col">
//         <DashboardHeader />

//         <main className="flex-1 p-6 lg:p-8">
//           {/* Page Header */}
//           <div className="mb-8">
//             <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2 text-primary neon-text">Knowledge</h1>
//             <p className="text-lg text-muted-foreground">
//               Discover information about people, movies, technology, and more
//             </p>
//           </div>

//           {/* Search Section */}
//           <div className="mb-8">
//             <div className="flex gap-3 max-w-2xl">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
//                 <Input
//                   type="text"
//                   placeholder="Ask Jarvis about anything..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   className="pl-10 glass bg-input/50 border-border/50 focus:border-primary focus:ring-primary/50 transition-all duration-300"
//                 />
//               </div>
//               <Button
//                 onClick={handleSearch}
//                 disabled={!searchQuery.trim() || isSearching}
//                 className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 neon-glow transition-all duration-300"
//               >
//                 {isSearching ? (
//                   <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
//                 ) : (
//                   <Sparkles size={18} />
//                 )}
//               </Button>
//             </div>
//           </div>

//           {/* Results */}
//           {results.length > 0 && (
//             <div className="space-y-6">
//               <h2 className="font-serif text-2xl font-bold text-secondary">Search Results</h2>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {results.map((item, index) => (
//                   <KnowledgeCard
//                     key={index}
//                     title={item.title}
//                     description={item.description}
//                     image={item.image}
//                     category={item.category}
//                     link={item.link}
//                     metadata={item.metadata}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* No Results */}
//           {searchQuery && results.length === 0 && !isSearching && (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">
//                 No results found for "{searchQuery}". Try searching for people, movies, or technology topics.
//               </p>
//             </div>
//           )}

//           {/* Default State */}
//           {!searchQuery && results.length === 0 && (
//             <div className="text-center py-12">
//               <div className="glass-card p-8 max-w-md mx-auto">
//                 <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
//                 <h3 className="font-serif text-xl font-bold mb-2">Ready to Learn</h3>
//                 <p className="text-muted-foreground">
//                   Search for information about famous people, movies, technology, companies, and more. Try searching for
//                   "Elon Musk", "The Matrix", or "Artificial Intelligence".
//                 </p>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { KnowledgeCard } from "@/components/knowledge-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Sparkles } from "lucide-react"
import { tr } from "date-fns/locale"

interface KnowledgeItem {
  title: string
  description: string
  image?: string
  category: string
  link?: string
  metadata?: {
    year?: string
    rating?: string
    genre?: string
  }
}

export default function KnowledgePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<KnowledgeItem[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("jarvis-auth")
    if (!auth) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    setHasSearched(false)

    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          searchQuery
        )}&format=json&origin=*`
      )
      const data = await response.json()

      if (data?.query?.search?.length) {
        const formattedResults = data.query.search.map((item: any) => ({
          title: item.title,
          description: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // remove HTML tags
          category: "Wikipedia",
          link: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
        }))
        setResults(formattedResults)
      } else {
        setResults([])
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setResults([])
    } finally {
      setIsSearching(false)
      setHasSearched(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2 text-primary neon-text">Knowledge</h1>
            <p className="text-lg text-muted-foreground">
              Discover real information directly from Wikipedia
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="flex gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Ask Swastik about anything..."
                  value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  onChange={(e) => {
                    const value = e.target.value
                    setSearchQuery(value)
                    if (value.trim() === "") {
                      setResults([]) // Clear search results when input is cleared
                    }
                  }}

                  onKeyPress={handleKeyPress}
                  className="pl-10 glass bg-input/50 border-border/50 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 neon-glow transition-all duration-300"
              >
                {isSearching ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Sparkles size={18} />
                )}
              </Button>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-secondary">Search Results</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {results.map((item, index) => (
                  <KnowledgeCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    link={item.link}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {hasSearched && results.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No results found for "{searchQuery}". Try another topic!
              </p>
            </div>
          )}

          {/* Default State */}
          {!searchQuery && results.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">Ready to Learn</h3>
                <p className="text-muted-foreground">
                  Search for anything — people, movies, science, history — directly from Wikipedia.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
