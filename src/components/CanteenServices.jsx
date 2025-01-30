import { useState } from "react"
import { Coffee, Search, Heart, Filter, ShoppingCart, X } from "lucide-react"

const MENU_ITEMS = [
  {
    id: 1,
    name: "Classic Burger",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&h=200",
    category: "Burgers",
    rating: 4.5,
    prepTime: "10-15 mins",
    description: "Juicy beef patty with fresh lettuce, tomatoes, and our special sauce",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&h=200",
    category: "Pizza",
    rating: 4.8,
    prepTime: "15-20 mins",
    description: "Fresh mozzarella, tomatoes, and basil on our house-made crust",
  },
  {
    id: 3,
    name: "Garden Fresh Salad",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&h=200",
    category: "Salads",
    rating: 4.3,
    prepTime: "5-10 mins",
    description: "Mixed greens with seasonal vegetables and balsamic dressing",
  },
  {
    id: 4,
    name: "Grilled Chicken Wrap",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=300&h=200",
    category: "Wraps",
    rating: 4.6,
    prepTime: "10-12 mins",
    description: "Grilled chicken with fresh vegetables and chipotle sauce",
  },
]

const categories = ["All", "Burgers", "Pizza", "Salads", "Wraps", "Drinks"]

export default function CanteenService() {
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  const [favorites, setFavorites] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [notification, setNotification] = useState(null)

  const addToCart = (itemId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId)
      if (existing) {
        return prev.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { id: itemId, quantity: 1 }]
    })
    showNotification("Item added to cart!")
  }

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId))
    showNotification("Item removed from cart.")
  }

  const toggleFavorite = (itemId) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
    showNotification(favorites.includes(itemId) ? "Removed from favorites." : "Added to favorites!")
  }

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const menuItem = MENU_ITEMS.find((mi) => mi.id === item.id)
      return total + (menuItem?.price || 0) * item.quantity
    }, 0)
  }

  const filteredItems = MENU_ITEMS.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  ).sort((a, b) => {
    if (sortBy === "price") return a.price - b.price
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "time") return Number.parseInt(a.prepTime) - Number.parseInt(b.prepTime)
    return 0
  })

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Coffee className="h-8 w-8 text-orange-600 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Campus Canteen</h2>
            <p className="text-gray-500">Order fresh food for pickup</p>
          </div>
        </div>
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors"
        >
          <ShoppingCart className="h-6 w-6 text-orange-600" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="p-4 bg-gray-50 rounded-lg animate-fade-in">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              {["rating", "price", "time"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1 rounded-md ${
                    sortBy === option ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="border rounded-xl overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
              >
                <Heart
                  className={`h-5 w-5 ${favorites.includes(item.id) ? "text-red-500 fill-current" : "text-gray-400"}`}
                />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                <span className="text-orange-600 font-bold">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>⭐ {item.rating}</span>
                <span>🕒 {item.prepTime}</span>
              </div>
              <button
                onClick={() => addToCart(item.id)}
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transform hover:scale-[1.02] transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Your Order</h3>
              <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              ) : (
                cart.map((item) => {
                  const menuItem = MENU_ITEMS.find((mi) => mi.id === item.id)
                  return (
                    <div key={item.id} className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <img
                          src={menuItem?.image || "/placeholder.svg"}
                          alt={menuItem?.name}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div>
                          <span className="font-medium">{menuItem?.name}</span>
                          <div className="text-sm text-gray-500">
                            x{item.quantity} · ${((menuItem?.price || 0) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total:</span>
                <span className="text-lg font-bold text-orange-600">${getTotal().toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => {
                  setShowCart(false)
                  showNotification("Order placed successfully!")
                  setCart([])
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {notification}
        </div>
      )}
    </div>
  )
}

