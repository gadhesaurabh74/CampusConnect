import { useState } from "react";
import { Coffee, Search, Heart, Filter, ShoppingCart, X } from "lucide-react";

// Mock data for menu items
const MENU_ITEMS = [
  {
    id: 1,
    name: "Classic Burger",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&h=200",
    category: "Burgers",
    rating: 4.5,
    prepTime: "8-12 mins",
    description: "Juicy beef patty with fresh lettuce, tomatoes, and our special sauce",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&h=200",
    category: "Pizza",
    rating: 4.8,
    prepTime: "12-15 mins",
    description: "Fresh mozzarella, tomatoes, and basil on our house-made crust",
  },
  {
    id: 3,
    name: "Garden Fresh Salad",
    price: 4.99,
    image: "https://hellolittlehome.com/wp-content/uploads/2022/08/garden-salad-recipe-2.jpg",
    category: "Salads",
    rating: 4.3,
    prepTime: "5-7 mins",
    description: "Mixed greens with seasonal vegetables and balsamic dressing",
  },
  {
    id: 4,
    name: "Grilled Chicken Wrap",
    price: 6.99,
    image: "https://tse3.mm.bing.net/th?id=OIP.lIr_L_AhaYNBfS3rIq1DPgHaF_&pid=Api&P=0&h=180",
    category: "Wraps",
    rating: 4.6,
    prepTime: "10-12 mins",
    description: "Grilled chicken with fresh vegetables and chipotle sauce",
  },
  {
    id: 5,
    name: "Pepperoni Pizza",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=300&h=200",
    category: "Pizza",
    rating: 4.7,
    prepTime: "15-18 mins",
    description: "Classic pepperoni pizza with extra cheese and a crispy crust",
  },
  {
    id: 6,
    name: "BBQ Chicken Pizza",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=300&h=200",
    category: "Pizza",
    rating: 4.9,
    prepTime: "18-20 mins",
    description: "BBQ chicken, red onions, and cilantro on a smoky BBQ sauce base",
  },
  {
    id: 7,
    name: "Cheeseburger",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&h=200",
    category: "Burgers",
    rating: 4.6,
    prepTime: "10-12 mins",
    description: "Juicy beef patty with melted cheese, pickles, and onions",
  },
  {
    id: 8,
    name: "Veggie Burger",
    price: 5.99,
    image: "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
    category: "Burgers",
    rating: 4.4,
    prepTime: "8-10 mins",
    description: "A delicious veggie patty with avocado, lettuce, and tomato",
  },
  {
    id: 9,
    name: "Caesar Salad",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&h=200",
    category: "Salads",
    rating: 4.5,
    prepTime: "5-7 mins",
    description: "Crisp romaine lettuce with croutons, parmesan, and Caesar dressing",
  },
  {
    id: 10,
    name: "Greek Salad",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&h=200",
    category: "Salads",
    rating: 4.6,
    prepTime: "6-8 mins",
    description: "Fresh cucumbers, tomatoes, olives, and feta cheese with olive oil",
  },
  {
    id: 11,
    name: "Chicken Caesar Wrap",
    price: 7.99,
    image: "https://lilluna.com/wp-content/uploads/2016/03/chicken-caesar-wrap-RESIZE-final-3.jpg",
    category: "Wraps",
    rating: 4.7,
    prepTime: "10-12 mins",
    description: "Grilled chicken, romaine lettuce, and Caesar dressing in a wrap",
  },
  {
    id: 12,
    name: "Veggie Wrap",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=300&h=200",
    category: "Wraps",
    rating: 4.5,
    prepTime: "8-10 mins",
    description: "Fresh vegetables, hummus, and avocado in a whole wheat wrap",
  },
  {
    id: 13,
    name: "Iced Coffee",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&h=200",
    category: "Drinks",
    rating: 4.8,
    prepTime: "2-3 mins",
    description: "Chilled coffee with milk and a hint of vanilla",
  },
  {
    id: 14,
    name: "Fresh Orange Juice",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=300&h=200",
    category: "Drinks",
    rating: 4.7,
    prepTime: "3-5 mins",
    description: "Freshly squeezed orange juice, served chilled",
  },
  {
    id: 15,
    name: "Strawberry Smoothie",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=300&h=200",
    category: "Drinks",
    rating: 4.9,
    prepTime: "5-7 mins",
    description: "Blended strawberries, yogurt, and honey for a refreshing treat",
  },
];
// Categories for filtering
const categories = ["All", "Burgers", "Pizza", "Salads", "Wraps", "Drinks"];

export default function CanteenService() {
  const [cart, setCart] = useState([]); // Cart state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category state
  const [showFilters, setShowFilters] = useState(false); // Filters visibility state
  const [sortBy, setSortBy] = useState("rating"); // Sorting state
  const [favorites, setFavorites] = useState([]); // Favorites state
  const [showCart, setShowCart] = useState(false); // Cart visibility state
  const [showFavorites, setShowFavorites] = useState(false); // Favorites visibility state
  const [notification, setNotification] = useState(null); // Notification state
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // Payment options visibility state
  const [selectedPayment, setSelectedPayment] = useState(null); // Selected payment method state
  const [selectedUPI, setSelectedUPI] = useState(null); // Selected UPI method state

  // Add item to cart
  const addToCart = (itemId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { id: itemId, quantity: 1 }];
    });
    showNotification("Item added to cart!");
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showNotification("Item removed from cart.");
  };

  // Toggle favorite item
  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
    showNotification(favorites.includes(itemId) ? "Removed from favorites." : "Added to favorites!");
  };

  // Calculate total price of items in cart
  const getTotal = () => {
    return cart.reduce((total, item) => {
      const menuItem = MENU_ITEMS.find((mi) => mi.id === item.id);
      return total + (menuItem?.price || 0) * item.quantity;
    }, 0);
  };

  // Filter and sort menu items
  const filteredItems = MENU_ITEMS.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "time") return Number.parseInt(a.prepTime) - Number.parseInt(b.prepTime);
    return 0;
  });

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("rating");
    showNotification("Filters cleared!");
  };

  // Handle place order
  const handlePlaceOrder = () => {
    setShowCart(false);
    setShowPaymentOptions(true); // Show payment options
  };

  // Handle payment selection
  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
    setSelectedUPI(null); // Reset UPI selection when changing payment method
  };

  // Handle UPI selection
  const handleUPISelection = (upiMethod) => {
    setSelectedUPI(upiMethod);
  };

  // Handle payment submission
  const handlePaymentSubmit = () => {
    if (selectedPayment === "UPI" && !selectedUPI) {
      alert("Please select a UPI method.");
    } else if (!selectedPayment) {
      alert("Please select a payment method.");
    } else {
      alert("Payment successful! Returning to home...");
      setShowPaymentOptions(false);
      setCart([]);
      showNotification("Order placed successfully!");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Coffee className="h-8 w-8 text-orange-600 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Campus Canteen</h2>
            <p className="text-gray-500">Order fresh food for pickup</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Favorites Button */}
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="relative p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors"
          >
            <Heart className="h-6 w-6 text-orange-600" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
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
      </div>

      {/* Favorites Section */}
      {showFavorites && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Your Favorites</h3>
              <button onClick={() => setShowFavorites(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {favorites.length === 0 ? (
                <p className="text-gray-500 text-center">Your favorites list is empty</p>
              ) : (
                favorites.map((itemId) => {
                  const menuItem = MENU_ITEMS.find((mi) => mi.id === itemId);
                  return (
                    <div key={itemId} className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <img
                          src={menuItem?.image || "/placeholder.svg"}
                          alt={menuItem?.name}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div>
                          <span className="font-medium">{menuItem?.name}</span>
                          <div className="text-sm text-gray-500">${menuItem?.price.toFixed(2)}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(itemId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
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
            <button
              onClick={clearFilters}
              className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
          >
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
                  className={`h-5 w-5 ${
                    favorites.includes(item.id) ? "text-red-500 fill-current" : "text-gray-400"
                  }`}
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

      {/* Cart Modal */}
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
                  const menuItem = MENU_ITEMS.find((mi) => mi.id === item.id);
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
                  );
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
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Options */}
      {showPaymentOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Select Payment Method</h3>
              <button onClick={() => setShowPaymentOptions(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {/* UPI Payment Option */}
              <div
                onClick={() => handlePaymentSelection("UPI")}
                className={`p-4 rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] ${
                  selectedPayment === "UPI" ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <h4 className="text-lg font-medium text-gray-800">UPI</h4>
                {selectedPayment === "UPI" && (
                  <div className="mt-4 space-y-3">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUPISelection("Google Pay");
                      }}
                      className={`p-3 rounded-lg flex items-center space-x-3 ${
                        selectedUPI === "Google Pay" ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.SbYKtgvH7NaOaewb8X8FrQHaDa&pid=Api&P=0&h=180"
                        alt="Google Pay"
                        className="h-8 w-8"
                      />
                      <span>Google Pay</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUPISelection("PhonePe");
                      }}
                      className={`p-3 rounded-lg flex items-center space-x-3 ${
                        selectedUPI === "PhonePe" ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <img
                        src="https://d3pc1xvrcw35tl.cloudfront.net/images/1200x900/payment-app-phone-pay-has-launched-an-aggregator-service-know-here-everything_2023061030257.jpg"
                        alt="PhonePe"
                        className="h-8 w-8"
                      />
                      <span>PhonePe</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUPISelection("Paytm");
                      }}
                      className={`p-3 rounded-lg flex items-center space-x-3 ${
                        selectedUPI === "Paytm" ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <img
                        src="https://cdn-1.webcatalog.io/catalog/paytm/paytm-icon.png"
                        alt="Paytm"
                        className="h-8 w-8"
                      />
                      <span>Paytm</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Credit Card Payment Option */}
              <div
                onClick={() => handlePaymentSelection("Credit Card")}
                className={`p-4 rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] ${
                  selectedPayment === "Credit Card" ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <h4 className="text-lg font-medium text-gray-800">Credit Card</h4>
                {selectedPayment === "Credit Card" && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src="https://worldfinancialreview.com/wp-content/uploads/2020/03/Credit-Card-Visa-Master-Card.jpg"
                      alt="Credit Card"
                      className="h-12"
                    />
                  </div>
                )}
              </div>

              {/* Cash Payment Option */}
              <div
                onClick={() => handlePaymentSelection("Cash")}
                className={`p-4 rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] ${
                  selectedPayment === "Cash" ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <h4 className="text-lg font-medium text-gray-800">Cash</h4>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50">
              <button
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transform hover:scale-[1.02] transition-all duration-300"
                onClick={handlePaymentSubmit}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {notification}
        </div>
      )}
    </div>
  );
}