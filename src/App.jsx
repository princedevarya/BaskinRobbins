import { useEffect, useMemo, useState } from "react";

/*
  Baskin Robbins by Shanzzy
  -------------------------
  IMPORTANT:
  - Menu sheets are local and expected at:
      public/images/menu/menu-01-rewards.webp
      public/images/menu/menu-02-sundaes.webp
      public/images/menu/menu-03-ice-creams.webp
      public/images/menu/menu-04-cakes.webp
      public/images/menu/menu-05-sundaes.webp
      public/images/menu/menu-06-desserts.webp
  - Product/hero images are loaded from external HTTPS URLs.
  - No product images need to be committed to GitHub.
*/

const MENU_IMAGES = [
  { id: 1, title: "Rewards Program", image: "/images/menu/menu-01-rewards.webp" },
  { id: 2, title: "Sundaes & Desserts", image: "/images/menu/menu-02-sundaes.webp" },
  { id: 3, title: "Ice Creams & Gelatos", image: "/images/menu/menu-03-ice-creams.webp" },
  { id: 4, title: "Ice Cream Cakes", image: "/images/menu/menu-04-cakes.webp" },
  { id: 5, title: "Sundaes & Desserts", image: "/images/menu/menu-05-sundaes.webp" },
  { id: 6, title: "Desserts & Treats", image: "/images/menu/menu-06-desserts.webp" },
];

/*
  Product images intentionally use remote URLs.
  The first seven and the four classic flavours use official
  Baskin Robbins India CDN assets. Category-level products use
  official BR range/category assets rather than random stock photos.
*/
const PRODUCTS = [
  {
    id: 1,
    name: "Tiramisu Cheesecake",
    category: "Dessert",
    price: 350,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Tiramisu_Cheesecake_414x.png?v=1764762258",
    description: "Creamy cheesecake with a rich tiramisu-inspired finish.",
  },
  {
    id: 2,
    name: "Classic Cheesecake with Mango Sauce",
    category: "Dessert",
    price: 190,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Classic_Cheesecake_with_Mango_Sauce_414x.png?v=1764762258",
    description: "Classic cheesecake paired with a bright mango sauce.",
  },
  {
    id: 3,
    name: "Blueberry Crumble Muffin",
    category: "Dessert",
    price: 165,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Blueberry_Crumble_Muffin_414x.png?v=1764762259",
    description: "A blueberry crumble treat for a sweet dessert break.",
  },
  {
    id: 4,
    name: "Choco Walnut Brownie",
    category: "Dessert",
    price: 125,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Choco_Walnut_Brownie_414x.png?v=1764762258",
    description: "Chocolate brownie with walnut goodness.",
  },
  {
    id: 5,
    name: "Saffron Gelato",
    category: "Gelato",
    price: 170,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Saffron_Gelato_414x.png?v=1764762258",
    description: "Premium saffron gelato with a rich aromatic profile.",
  },
  {
    id: 6,
    name: "Biscoff Cheesecake Gelato",
    category: "Gelato",
    price: 170,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Biscoff_Cheesecake_Gelato_414x.png?v=1764762258",
    description: "Cheesecake-style gelato with a Biscoff-inspired taste.",
  },
  {
    id: 7,
    name: "Strawberry & Cream Gelato",
    category: "Gelato",
    price: 170,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Strawberry_Cream_Gelato_414x.png?v=1764762258",
    description: "Smooth strawberry and cream gelato.",
  },
  {
    id: 8,
    name: "Black Currant",
    category: "Ice Cream",
    price: 109,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Website-BlackCurrant_414x.png?v=1722322356",
    description: "A classic Baskin Robbins black currant favourite.",
  },
  {
    id: 9,
    name: "Very Berry Strawberry",
    category: "Ice Cream",
    price: 109,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Homepage_product_r1-01_414x.png?v=1681714415",
    description: "Strawberry ice cream packed with berry flavour.",
  },
  {
    id: 10,
    name: "Cotton Candy",
    category: "Ice Cream",
    price: 109,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/CottonCandy--450ml---1043sq_414x.png?v=1698056994",
    description: "Fun, colourful cotton candy ice cream.",
  },
  {
    id: 11,
    name: "Mississippi Mud",
    category: "Ice Cream",
    price: 109,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/MississippiMud-450ml---1043sq_414x.png?v=1698057067",
    description: "A rich chocolate-forward Baskin Robbins classic.",
  },
  {
    id: 12,
    name: "Ice Cream Scoop",
    category: "Ice Cream",
    price: 72,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/SCOOPS_d9897fbb-eccc-4995-af2f-a41db70e9c65_414x.png?v=1698414156",
    description: "Choose your favourite flavour as a delicious scoop.",
  },
  {
    id: 13,
    name: "Ice Cream Cake",
    category: "Ice Cream Cake",
    price: 699,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Cakes_08fe6ba3-ff60-4e01-abda-db35cfca8171_414x.png?v=1698414156",
    description: "Celebration-ready ice cream cakes.",
  },
  {
    id: 14,
    name: "Snickers Caramel Sundae",
    category: "Sundae",
    price: 165,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Snickers-Caramel-Sundae_414x.png?v=1698414156",
    description: "A loaded sundae inspired by Snickers and caramel.",
  },
  {
    id: 15,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 100,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/add-ons_40ad4690-9eeb-46fe-b929-a1619ea181b9_414x.png?v=1698414157",
    description: "A warm-style chocolate dessert option.",
  },
  {
    id: 16,
    name: "Baskin Robbins Beverage",
    category: "Beverages",
    price: 199,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/BEVERAGE_95b0dcd1-b12e-4947-87ae-d17feaf2889b_414x.png?v=1698414157",
    description: "A refreshing beverage from the BR range.",
  },
  {
    id: 17,
    name: "Arctic Ice Cream Pizza",
    category: "Dessert",
    price: 335,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Arctic-IC-Pizza_c82eef5c-e769-485e-a97b-906ff0fe1ab7_414x.png?v=1698414157",
    description: "An ice cream pizza made for sharing.",
  },
  {
    id: 18,
    name: "Winter Launch Treat",
    category: "Dessert",
    price: 220,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Winter-Launch_ffebc6f0-f94d-4a3b-b11e-8ccbfeb06265_414x.png?v=1698414156",
    description: "A seasonal Baskin Robbins treat.",
  },
  {
    id: 19,
    name: "Variety Pack",
    category: "Gifting",
    price: 450,
    image:
      "https://baskinrobbinsindia.com/cdn/shop/files/Variety-Pack_4c80af1b-2b50-44ae-8564-2b39d1fcf8c3_414x.png?v=1698414156",
    description: "A variety pack for sharing or gifting.",
  },
];

const CATEGORIES = [
  "All",
  "Ice Cream",
  "Gelato",
  "Sundae",
  "Ice Cream Cake",
  "Dessert",
  "Beverages",
  "Gifting",
];

const SHOWCASE_PRODUCTS = PRODUCTS.filter((product) => product.category === "Ice Cream").slice(0, 4);

const OFFERS = [
  {
    id: 1,
    icon: "31",
    badge: "MONTHLY REWARD",
    title: "31st of the Month",
    subtitle: "31% OFF",
    description:
      "Make the 31st extra sweet with 31% off your favourite treats. Ask in-store for the applicable terms.",
  },
  {
    id: 2,
    icon: "15",
    badge: "VISIT REWARD",
    title: "15th Visit",
    subtitle: "FREE ICE CREAM CAKE",
    description:
      "Reach your 15th visit and enjoy a free ice cream cake. Ask in-store about reward eligibility and redemption.",
  },
  {
    id: 3,
    icon: "BR",
    badge: "EVERY VISIT",
    title: "Sweet Rewards",
    subtitle: "Make every visit sweeter",
    description:
      "Keep coming back for more sweet moments, special treats and rewards made for our regular customers.",
  },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuIndex, setMenuIndex] = useState(0);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  // Reveal sections/cards as they enter the viewport.
  useEffect(() => {
    const items = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Keep the menu showcase alive without requiring manual navigation.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setMenuIndex((current) => (current + 1) % MENU_IMAGES.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  // Rotate the hero showcase gently between featured flavours.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowcaseIndex((current) => (current + 1) % SHOWCASE_PRODUCTS.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const showcaseProduct = SHOWCASE_PRODUCTS[showcaseIndex] || SHOWCASE_PRODUCTS[0];

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return PRODUCTS;
    return PRODUCTS.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cart.length;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMobileMenuOpen(false);
  };

  const addToCart = (product) => {
    setCart((current) => [...current, product]);
    setOrderStatus("");
  };

  const removeFromCart = (index) => {
    setCart((current) => current.filter((_, i) => i !== index));
  };

  const updateCustomer = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };

  const submitOrder = async (event) => {
    event.preventDefault();

    if (!cart.length) {
      setOrderStatus("Please add at least one item to your order.");
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setOrderStatus(
        "Web3Forms access key is missing. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file."
      );
      return;
    }

    const items = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} | ${item.category} | ₹${item.price}`
      )
      .join("\n");

    const message = [
      "NEW ORDER - BASKIN ROBBINS BY SHANZZY",
      "",
      `Customer Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Email: ${customer.email || "Not provided"}`,
      `Delivery / Pickup Details: ${customer.address}`,
      `Notes: ${customer.notes || "None"}`,
      "",
      "ORDER ITEMS:",
      items,
      "",
      `TOTAL: ₹${cartTotal}`,
      "",
      "Store Location: Baskin Robbins, Sehore, Madhya Pradesh, India",
    ].join("\n");

    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("subject", `New Ice Cream Order - ${customer.name}`);
    formData.append("from_name", "Baskin Robbins by Shanzzy Website");
    formData.append("name", customer.name);
    formData.append("email", customer.email || "customer@order.local");
    formData.append("phone", customer.phone);
    formData.append("message", message);
    formData.append("botcheck", "");

    try {
      setOrderStatus("Sending your order...");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Order could not be sent.");
      }

      setOrderStatus(
        "Order received successfully! We will contact you shortly."
      );
      setCart([]);
      setShowCheckout(false);
      setCustomer({
        name: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
      });
    } catch (error) {
      setOrderStatus(
        error.message || "Something went wrong while sending your order."
      );
    }
  };

  return (
    <div className="site-shell min-h-screen overflow-x-hidden text-[#5D4037]">
      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <nav className="glass-nav mx-auto max-w-7xl rounded-2xl border border-white/70 bg-white/90 shadow-xl backdrop-blur-xl">
          <div className="flex h-[76px] items-center justify-between px-4 sm:px-6">
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="nav-brand group flex min-w-0 items-center gap-2.5 sm:gap-3"
            >
              <div className="nav-brand-mark flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4da6] via-[#ff007f] to-[#d9006c] text-sm font-black text-white shadow-[0_8px_24px_rgba(255,0,127,.28)] sm:h-11 sm:w-11 sm:text-lg">
                BR
              </div>
              <div className="nav-brand-copy min-w-0 text-left">
                <div className="truncate text-[13px] font-black leading-none sm:text-[17px]">
                  Baskin Robbins
                </div>
                <div className="mt-1 text-[11px] font-extrabold leading-none text-[#FF007F] sm:text-sm">
                  by Shanzzy
                </div>
              </div>
            </button>

            <div className="hidden items-center gap-1 lg:flex">
              {[
                ["Home", "home"],
                ["Menu", "menu"],
                ["Order", "products"],
                ["Offers", "offers"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-pink-50 hover:text-[#FF007F]"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo("order")}
                className="hidden items-center gap-2 rounded-full bg-[#FF007F] px-5 py-3 text-sm font-bold text-white shadow-lg sm:flex"
              >
                Order Now
                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs text-[#FF007F]">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="mobile-menu-button flex h-11 w-11 items-center justify-center rounded-xl border border-pink-100 bg-pink-50/80 text-[#FF007F] shadow-sm transition hover:bg-pink-100 lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-gray-100 px-5 py-4 lg:hidden">
              <div className="flex flex-col gap-1">
                {[
                  ["Home", "home"],
                  ["Menu", "menu"],
                  ["Order", "products"],
                  ["Offers", "offers"],
                  ["Contact", "contact"],
                ].map(([label, id]) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="rounded-xl px-4 py-3 text-left font-semibold hover:bg-pink-50 hover:text-[#FF007F]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        <section id="home" className="relative scroll-mt-0 overflow-hidden bg-[#fff7fb]">
          <div className="hero-showcase-shell">
            <div className="hero-showcase-card">
              <div className="hero-showcase-glow hero-showcase-glow-one" />
              <div className="hero-showcase-glow hero-showcase-glow-two" />

              <div className="hero-showcase-top">
                <div className="hero-showcase-top-spacer" aria-hidden="true" />

                <div className="hero-showcase-stats" aria-label="Store highlights">
                  <div><strong>31%</strong><span>Discount</span></div>
                  <div><strong>19+</strong><span>Treats</span></div>
                  <div><strong>4</strong><span>Flavours</span></div>
                </div>
              </div>

              <div className="hero-showcase-content">
                <div className="hero-showcase-copy">
                  <p className="hero-showcase-kicker">FEATURED FLAVOUR</p>
                  <div className="hero-showcase-title-wrap" key={showcaseProduct.id}>
                    <h1>{showcaseProduct.name}</h1>
                    <p>{showcaseProduct.description}</p>
                    <div className="hero-showcase-price">
                      <span>Starting from</span>
                      <strong>₹{showcaseProduct.price}</strong>
                    </div>
                    <div className="hero-showcase-actions">
                      <button
                        type="button"
                        onClick={() => addToCart(showcaseProduct)}
                        className="hero-showcase-order"
                      >
                        Order Now
                        <span aria-hidden="true">→</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollTo("products")}
                        className="hero-showcase-menu"
                      >
                        View Menu
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hero-showcase-product" key={`product-${showcaseProduct.id}`}>
                  <div className="hero-product-halo" />
                  <div className="hero-product-shadow" />
                  <img
                    src={showcaseProduct.image}
                    alt={showcaseProduct.name}
                    className="hero-product-image"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="hero-showcase-flavours">
                  <p>Explore flavours</p>
                  <div className="hero-flavour-list">
                    {SHOWCASE_PRODUCTS.map((product, index) => (
                      <button
                        type="button"
                        key={product.id}
                        onClick={() => setShowcaseIndex(index)}
                        className={`hero-flavour ${index === showcaseIndex ? "active" : ""}`}
                        aria-label={`Show ${product.name}`}
                      >
                        <span className="hero-flavour-image">
                          <img src={product.image} alt="" referrerPolicy="no-referrer" />
                        </span>
                        <span>{product.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hero-showcase-bottom">
                <div><span className="hero-bottom-dot" /> Premium ice creams</div>
                <div><span className="hero-bottom-dot" /> Cakes & desserts</div>
                <div><span className="hero-bottom-dot" /> Fresh beverages</div>
                <div><span className="hero-bottom-dot" /> Sweet rewards</div>
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="reveal-on-scroll scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FF007F]">
                Explore
              </p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">Our Menu</h2>
              <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#FF007F]" />
              <p className="mx-auto mt-6 max-w-2xl text-gray-600">
                Browse the original menu sheets and discover your next
                favourite treat.
              </p>
            </div>

            <div className="menu-showcase relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border bg-white shadow-2xl">
              <div className="relative aspect-[4/3] bg-gray-50">
                <img
                  src={MENU_IMAGES[menuIndex].image}
                  alt={MENU_IMAGES[menuIndex].title}
                  className="menu-image h-full w-full object-contain"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMenuIndex((current) =>
                      current === 0 ? MENU_IMAGES.length - 1 : current - 1
                    )
                  }
                  aria-label="Previous menu"
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl font-bold shadow-xl transition hover:scale-110 hover:text-[#FF007F]"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMenuIndex((current) =>
                      current === MENU_IMAGES.length - 1 ? 0 : current + 1
                    )
                  }
                  aria-label="Next menu"
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl font-bold shadow-xl transition hover:scale-110 hover:text-[#FF007F]"
                >
                  ›
                </button>
              </div>

              <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
                <div>
                  <h3 className="text-xl font-extrabold">
                    {MENU_IMAGES[menuIndex].title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Menu {menuIndex + 1} of {MENU_IMAGES.length}
                  </p>
                </div>

                <div className="flex gap-2">
                  {MENU_IMAGES.map((menu, index) => (
                    <button
                      type="button"
                      key={menu.id}
                      onClick={() => setMenuIndex(index)}
                      aria-label={`Show menu ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${index === menuIndex
                        ? "w-8 bg-[#FF007F]"
                        : "w-2.5 bg-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="products"
          className="reveal-on-scroll relative scroll-mt-24 overflow-hidden bg-white/70 px-5 py-24 sm:px-8 lg:px-12"
        >
          <div className="pointer-events-none absolute -left-48 top-48 h-[500px] w-[500px] rounded-full border border-[#FF007F]/10" />
          <div className="pointer-events-none absolute -right-48 bottom-32 h-[550px] w-[550px] rounded-full border border-[#5D4037]/10" />

          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FF007F]">
                Order Online
              </p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                Pick Your Happiness
              </h2>
              <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#FF007F]" />
              <p className="mx-auto mt-6 max-w-2xl text-gray-600">
                Choose your favourite ice cream, gelato, sundae, cake, dessert,
                beverage or gifting option.
              </p>
            </div>

            <div className="category-scroll mb-10 flex w-full flex-nowrap justify-start gap-3 overflow-x-auto px-1 pb-2 sm:justify-center" role="tablist" aria-label="Product categories">
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={`category-pill shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition duration-300 ${activeCategory === category
                    ? "border-[#FF007F] bg-[#FF007F] text-white shadow-lg shadow-pink-500/20"
                    : "border-white bg-white text-[#5D4037] shadow-sm hover:-translate-y-0.5 hover:border-pink-100 hover:bg-pink-50 hover:text-[#FF007F]"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredProducts.length > 0 ? (
              <div
                key={activeCategory}
                className="products-horizontal"
                aria-label={`${activeCategory} products`}
              >
                {filteredProducts.map((product, index) => (
                  <article
                    key={product.id}
                    className="product-card group relative overflow-hidden rounded-[2rem] border border-white bg-white shadow-lg"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 z-10 h-28 w-28 rounded-full border-2 border-[#FF007F]/10" />

                    <div className="relative h-64 overflow-hidden bg-pink-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#FF007F] shadow-lg">
                        {product.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-black text-[#5D4037]">
                        {product.name}
                      </h3>
                      <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                        {product.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs text-gray-400">Starting from</p>
                          <p className="text-2xl font-black text-[#FF007F]">
                            ₹{product.price}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="glow-button rounded-full bg-[#5D4037] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#FF007F]"
                        >
                          + Order
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-pink-100 bg-white px-6 py-16 text-center shadow-sm">
                <h3 className="text-2xl font-black text-[#5D4037]">Nothing in this category yet</h3>
                <p className="mt-2 text-gray-500">Please choose another category.</p>
              </div>
            )}

            <p className="mt-8 text-center text-sm font-semibold text-gray-400">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} available
            </p>
          </div>
        </section>

        <section id="order" className="reveal-on-scroll scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FF007F]">
                Your Selection
              </p>
              <h2 className="mt-3 text-4xl font-black">Your Order</h2>
            </div>

            <div className="rounded-[2rem] border bg-white p-6 shadow-2xl sm:p-10">
              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-3xl">

                  </div>
                  <h3 className="mt-6 text-2xl font-black">
                    Your order is empty
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Choose something delicious from our menu.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo("products")}
                    className="mt-6 rounded-full bg-[#FF007F] px-7 py-3 font-bold text-white"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 p-4"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-xl object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h3 className="truncate font-bold">{item.name}</h3>
                            <p className="text-sm text-gray-500">
                              {item.category} · ₹{item.price}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(index)}
                          className="shrink-0 rounded-full px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-3xl font-black text-[#FF007F]">
                        ₹{cartTotal}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowCheckout(true)}
                      className="mt-6 w-full rounded-full bg-[#FF007F] py-4 font-bold text-white shadow-lg transition hover:bg-[#e60072]"
                    >
                      Proceed to Order →
                    </button>
                  </div>
                </>
              )}

              {orderStatus && (
                <div
                  className={`mt-6 rounded-2xl p-4 text-center text-sm font-semibold ${orderStatus.toLowerCase().includes("success")
                    ? "bg-green-50 text-green-700"
                    : "bg-pink-50 text-[#FF007F]"
                    }`}
                >
                  {orderStatus}
                </div>
              )}
            </div>
          </div>
        </section>

        {showCheckout && cart.length > 0 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#FF007F]">
                    Checkout
                  </p>
                  <h2 className="mt-2 text-3xl font-black">Place Your Order</h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="rounded-full bg-gray-100 px-4 py-2 text-xl font-bold"
                  aria-label="Close checkout"
                >
                  ×
                </button>
              </div>

              <form onSubmit={submitOrder} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold">
                      Name *
                    </span>
                    <input
                      required
                      name="name"
                      value={customer.name}
                      onChange={updateCustomer}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF007F]"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold">
                      Phone *
                    </span>
                    <input
                      required
                      name="phone"
                      value={customer.phone}
                      onChange={updateCustomer}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF007F]"
                      placeholder="10-digit mobile number"
                      inputMode="tel"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={updateCustomer}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF007F]"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold">
                    Delivery / Pickup Details *
                  </span>
                  <textarea
                    required
                    name="address"
                    value={customer.address}
                    onChange={updateCustomer}
                    rows="3"
                    className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF007F]"
                    placeholder="Full address or pickup details"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold">Notes</span>
                  <textarea
                    name="notes"
                    value={customer.notes}
                    onChange={updateCustomer}
                    rows="2"
                    className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF007F]"
                    placeholder="Any special instructions?"
                  />
                </label>

                <div className="rounded-2xl bg-pink-50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Order Total</span>
                    <span className="text-2xl font-black text-[#FF007F]">
                      ₹{cartTotal}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Your order details will be sent to your configured
                    Web3Forms inbox.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#FF007F] py-4 font-bold text-white shadow-lg transition hover:bg-[#e60072]"
                >
                  Confirm & Send Order →
                </button>
              </form>
            </div>
          </div>
        )}

        <section
          id="offers"
          className="reveal-on-scroll scroll-mt-24 bg-[#fff0f7] px-5 py-24 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FF007F]">
                Just For You
              </p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                What's Special For You?
              </h2>
              <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#FF007F]" />
              <p className="mx-auto mt-6 max-w-2xl text-gray-600">
                Sweet offers and special moments made just for you.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {OFFERS.map((offer) => (
                <article
                  key={offer.id}
                  className="offer-card group relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-lg transition duration-500 hover:-translate-y-3 hover:shadow-2xl sm:p-8"
                >
                  <div className="offer-card-glow" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="offer-number">{offer.icon}</div>
                      <span className="rounded-full border border-pink-100 bg-pink-50 px-3 py-1.5 text-[10px] font-black tracking-[0.16em] text-[#FF007F]">
                        {offer.badge}
                      </span>
                    </div>
                    <p className="mt-7 text-sm font-black uppercase tracking-[0.16em] text-[#FF007F]">
                      {offer.subtitle}
                    </p>
                    <h3 className="mt-2 text-2xl font-black">{offer.title}</h3>
                    <p className="mt-4 leading-7 text-gray-500">{offer.description}</p>
                    <button
                      type="button"
                      onClick={() => scrollTo("products")}
                      className="mt-7 inline-flex items-center gap-2 font-bold text-[#FF007F] transition group-hover:gap-3"
                    >
                      Explore Treats <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="reveal-on-scroll scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-16">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FF007F]">
                  Get In Touch
                </p>
                <h2 className="mt-3 text-4xl font-black">Contact Us</h2>
                <p className="mt-5 leading-7 text-gray-600">
                  Have a question or simply want some ice cream? We'd love to
                  hear from you.
                </p>

                <div className="mt-10 space-y-7">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-[#FF007F]">
                      {/* Location SVG */}
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="font-bold">Location</h3>
                      <p className="mt-1 text-gray-500">
                        Baskin Robbins, Sehore, Madhya Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-[#FF007F]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2
        19.79 19.79 0 0 1-8.63-3.07
        19.5 19.5 0 0 1-6-6
        A19.79 19.79 0 0 1 2.12 4.18
        A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72
        12.84 12.84 0 0 0 .7 2.81
        2 2 0 0 1-.45 2.11L8.09 9.91
        a16 16 0 0 0 6 6l1.27-1.27
        a2 2 0 0 1 2.11-.45
        12.84 12.84 0 0 0 2.81.7
        A2 2 0 0 1 22 16.92Z"
                        />
                      </svg>
                    </div>

                    <div>
                      <h3 className="font-bold">Phone</h3>
                      <a
                        href="tel:8085607815"
                        className="mt-1 block text-gray-500 hover:text-[#FF007F]"
                      >
                        8085607815
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-[#FF007F]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <a
                        href="mailto:baskinrobbinsodee@gmail.com"
                        className="mt-1 block break-all text-gray-500 hover:text-[#FF007F]"
                      >
                        baskinrobbinsodee@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-[#FF007F]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="font-bold">Opening Hours</h3>
                      <p className="mt-1 text-gray-500">
                        Open Daily
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/place/Baskin+Robbins/@23.0180063,76.667942,17z"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-[#5D4037] px-6 py-3 font-bold text-white transition hover:bg-[#FF007F]"
                  >
                    Open Exact Location in Google Maps →
                  </a>
                </div>
              </div>

              <div className="min-h-[450px] bg-[#5D4037]">
                <iframe
                  title="Baskin Robbins by Shanzzy Location"
                  src="https://www.google.com/maps?q=23.0180063,76.667942&z=17&output=embed"
                  className="h-full min-h-[450px] w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer relative overflow-hidden px-5 pb-8 pt-16 text-white sm:px-8">
        <div className="footer-orb footer-orb-one" />
        <div className="footer-orb footer-orb-two" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-xl sm:p-9">
            <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-200">Baskin Robbins by Shanzzy</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Your next favourite scoop is waiting.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                  Browse the menu, build your order and send it directly to our store.
                </p>
              </div>
              <button
                type="button"
                onClick={() => scrollTo("products")}
                className="shrink-0 rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-[#d9006c] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                Order Online
              </button>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.35fr_.8fr_.9fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="footer-brand-mark flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4da6] via-[#ff007f] to-[#c90062] text-lg font-black text-white shadow-[0_12px_35px_rgba(255,0,127,.35)]">
                  BR
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">Baskin Robbins</h2>
                  <p className="text-sm font-bold text-pink-200">by Shanzzy</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
                Ice creams, gelatos, cakes, sundaes and desserts for every sweet moment.
                Order online or visit us in Sehore.
              </p>

              <div className="mt-6 space-y-3 text-sm text-white/70">
                <a href="tel:8085607815" className="block transition hover:text-white">8085607815</a>
                <a href="mailto:baskinrobbinsodee@gmail.com" className="block transition hover:text-white">baskinrobbinsodee@gmail.com</a>
                <a
                  href="https://www.google.com/maps/place/Baskin+Robbins/@23.0180063,76.667942,17z"
                  target="_blank"
                  rel="noreferrer"
                  className="block max-w-sm leading-6 transition hover:text-white"
                >
                  Baskin Robbins, Sehore, Madhya Pradesh, India
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-pink-200">Explore</h3>
              <div className="mt-5 flex flex-col items-start gap-3 text-sm text-white/65">
                {[
                  ["Home", "home"],
                  ["Menu", "menu"],
                  ["Order Online", "products"],
                  ["Offers", "offers"],
                  ["Contact", "contact"],
                ].map(([label, id]) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="footer-link"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-pink-200">Follow</h3>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Follow our Sehore store for new flavours, offers and updates.
              </p>
              <a
                href="https://www.instagram.com/baskin.robbins_ode?utm_source=qr&stkn=bDBtb2Rsd29yZ3dp"
                target="_blank"
                rel="noreferrer"
                aria-label="Baskin Robbins by Shanzzy on Instagram"
                className="instagram-link mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15"
              >
                <span className="instagram-icon">IG</span>
                @baskin.robbins_ode
              </a>
            </div>
          </div>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/45 md:flex-row">
            <p>© 2026 Baskin Robbins by Shanzzy. All rights reserved.</p>
            <p>Serving Sehore, Madhya Pradesh.</p>
          </div>
        </div>
      </footer>

      <style>{`
        :root {
          --br-pink: #ff007f;
          --br-pink-soft: #fff0f7;
          --br-brown: #5d4037;
          --br-cream: #fffafc;
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }

        body {
          background: var(--br-cream);
        }

        ::selection {
          background: rgba(255, 0, 127, 0.22);
          color: var(--br-brown);
        }

        html {
          scroll-behavior: smooth;
        }

        .nav-brand {
          max-width: 235px;
        }

        .nav-brand-copy {
          min-width: 0;
        }

        .nav-brand-mark {
          position: relative;
          overflow: hidden;
        }

        .nav-brand-mark::after {
          content: "";
          position: absolute;
          inset: -60%;
          background: linear-gradient(115deg, transparent 42%, rgba(255,255,255,.55) 50%, transparent 58%);
          transform: translateX(-55%);
          animation: logoShine 4.5s ease-in-out infinite;
        }

        .glass-nav {
          position: relative;
          isolation: isolate;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .glass-nav::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.7), transparent);
          transform: translateX(-120%);
          animation: navShimmer 8s ease-in-out infinite;
        }

        .home-reference-frame {
          line-height: 0;
          position: relative;
          min-height: min(780px, 78vw);
          background: #f7a8c8;
        }

        .home-reference-frame > img {
          width: 100%;
          height: 100%;
          min-height: min(780px, 78vw);
          object-fit: cover;
          object-position: center;
        }

        .hero-copy {
          position: absolute;
          z-index: 10;
          left: 50%;
          top: 51%;
          width: min(680px, 48vw);
          transform: translate(-50%, -50%);
          text-align: center;
          color: #4a2a2b;
          line-height: 1.2;
          pointer-events: none;
        }

        .hero-ambient {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
          mix-blend-mode: normal;
        }

        .hero-ambient::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 18%, rgba(255,255,255,.22) 48%, transparent 72%);
          transform: translateX(-100%);
          animation: heroSheen 10s ease-in-out infinite;
        }

        .hero-ambient-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(2px);
          opacity: .5;
        }

        .hero-ambient-orb-one {
          width: 220px; height: 220px; left: -70px; top: 18%;
          background: radial-gradient(circle, rgba(255,0,127,.18), transparent 68%);
          animation: ambientFloat 8s ease-in-out infinite;
        }

        .hero-ambient-orb-two {
          width: 280px; height: 280px; right: -100px; bottom: 8%;
          background: radial-gradient(circle, rgba(255,255,255,.55), rgba(255,0,127,.12) 48%, transparent 72%);
          animation: ambientFloat 10s ease-in-out infinite reverse;
        }

        .hero-ambient-ring {
          position: absolute;
          border: 1px solid rgba(255,0,127,.16);
          border-radius: 999px;
        }

        .hero-ambient-ring-one { width: 190px; height: 190px; left: 7%; top: 16%; animation: ringDrift 9s ease-in-out infinite; }
        .hero-ambient-ring-two { width: 130px; height: 130px; right: 8%; top: 25%; animation: ringDrift 7s ease-in-out infinite reverse; }

        .hero-sparkle {
          position: absolute;
          width: 7px; height: 7px; border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 0 5px rgba(255,255,255,.25), 0 0 18px rgba(255,0,127,.45);
          animation: sparklePulse 3.2s ease-in-out infinite;
        }
        .hero-sparkle-one { left: 23%; top: 21%; }
        .hero-sparkle-two { right: 24%; top: 18%; width: 5px; height: 5px; animation-delay: -.8s; }
        .hero-sparkle-three { left: 19%; bottom: 22%; width: 5px; height: 5px; animation-delay: -1.6s; }
        .hero-sparkle-four { right: 18%; bottom: 20%; animation-delay: -2.2s; }

        .hero-copy::before {
          content: "";
          position: absolute;
          inset: -70px -110px;
          z-index: -1;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(255, 246, 251, .72) 0%, rgba(255, 241, 248, .48) 38%, transparent 72%);
          filter: blur(10px);
        }

        .hero-eyebrow {
          margin: 0 0 18px;
          font-size: clamp(11px, 1vw, 15px);
          font-weight: 800;
          letter-spacing: .38em;
          color: #ff007f;
          line-height: 1;
        }

        .hero-copy h1 {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(38px, 4.7vw, 76px);
          font-weight: 700;
          letter-spacing: -.055em;
          line-height: .9;
          text-shadow: 0 5px 22px rgba(82, 25, 47, .08);
        }

        .hero-copy h1 span:first-child {
          font-size: .54em;
          letter-spacing: -.025em;
          margin-bottom: 2px;
        }

        .hero-copy h1 strong {
          font-size: 1.16em;
          font-weight: 800;
          background: linear-gradient(105deg, #ef006f 0%, #ff007f 42%, #d80068 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 8px 18px rgba(255, 0, 127, .12));
        }

        .hero-copy h1 span:last-child {
          font-size: .67em;
          letter-spacing: -.04em;
          margin-top: 5px;
        }

        .hero-description {
          max-width: 570px;
          margin: 24px auto 0;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          font-size: clamp(13px, 1.18vw, 18px);
          font-weight: 500;
          line-height: 1.55;
          color: #5a3940;
          text-wrap: balance;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 25px;
          pointer-events: auto;
        }

        .hero-primary, .hero-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          min-height: 50px;
          padding: 0 25px;
          border-radius: 999px;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          font-size: 14px;
          font-weight: 800;
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
          cursor: pointer;
        }

        .hero-primary {
          border: 1px solid #ff007f;
          background: linear-gradient(135deg, #ff007f, #e80070);
          color: white;
          box-shadow: 0 14px 30px rgba(255, 0, 127, .27);
        }

        .hero-primary span {
          display: grid;
          place-items: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: white;
          color: #ff007f;
          font-size: 15px;
        }

        .hero-secondary {
          border: 1px solid rgba(107, 47, 70, .13);
          background: rgba(255, 255, 255, .72);
          color: #4a2a2b;
          box-shadow: 0 10px 26px rgba(88, 39, 61, .09);
          backdrop-filter: blur(12px);
        }

        .hero-primary:hover, .hero-secondary:hover {
          transform: translateY(-3px);
        }

        .hero-primary:hover {
          box-shadow: 0 18px 38px rgba(255, 0, 127, .34);
        }

        .hero-secondary:hover {
          background: rgba(255, 255, 255, .9);
        }

        .hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          margin-top: 21px;
          color: #704d54;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .04em;
          opacity: .82;
        }

        .hero-meta i {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ff007f;
        }

        .hero-scroll-cue {
          position: absolute;
          z-index: 12;
          left: 50%;
          bottom: 4.5%;
          width: 34px;
          height: 52px;
          transform: translateX(-50%);
          border: 1px solid rgba(255, 0, 127, .52);
          border-radius: 999px;
          background: rgba(255,255,255,.42);
          backdrop-filter: blur(8px);
          pointer-events: auto;
          cursor: pointer;
        }

        .hero-scroll-cue span {
          position: absolute;
          top: 10px;
          left: 50%;
          width: 5px;
          height: 12px;
          border-radius: 999px;
          background: #ff007f;
          transform: translateX(-50%);
          animation: scrollDot 1.8s ease-in-out infinite;
        }

        @keyframes scrollDot {
          0%, 100% { transform: translate(-50%, 0); opacity: .45; }
          50% { transform: translate(-50%, 13px); opacity: 1; }
        }

        .home-reference-frame {
          line-height: 0;
        }

        .home-hotspot {
          position: absolute;
          z-index: 5;
          display: block;
          border: 0;
          background: transparent;
          cursor: pointer;
          border-radius: 999px;
        }

        .home-hotspot:focus-visible {
          outline: 3px solid #ff007f;
          outline-offset: 4px;
        }

        /* Coordinates are based on the supplied 1536 x 1024 reference image. */
        .home-hotspot-home { left: 29.0%; top: 2.7%; width: 5.0%; height: 4.5%; }
        .home-hotspot-menu { left: 35.1%; top: 2.7%; width: 5.0%; height: 4.5%; }
        .home-hotspot-order { left: 41.0%; top: 2.7%; width: 8.0%; height: 4.5%; }
        .home-hotspot-about { left: 50.3%; top: 2.7%; width: 5.0%; height: 4.5%; }
        .home-hotspot-contact { left: 56.4%; top: 2.7%; width: 5.5%; height: 4.5%; }
        .home-hotspot-location { left: 74.0%; top: 1.0%; width: 14.0%; height: 7.5%; }
        .home-hotspot-cart { left: 90.0%; top: 0.6%; width: 7.0%; height: 8.0%; }
        .home-hotspot-order-now { left: 35.5%; top: 47.2%; width: 14.2%; height: 7.0%; }
        .home-hotspot-explore { left: 51.5%; top: 47.2%; width: 14.0%; height: 7.0%; }
        .home-hotspot-scroll { left: 47.8%; top: 59.5%; width: 5.0%; height: 6.0%; }

        @media (max-width: 900px) {
          .home-reference-frame {
            min-height: 680px;
          }

          .home-reference-frame > img {
            min-height: 680px;
            object-position: center;
          }

          .hero-copy {
            width: min(620px, 74vw);
            top: 50%;
          }

          .hero-copy::before {
            inset: -60px -70px;
          }
        }

        @media (max-width: 640px) {
          .home-reference-frame,
          .home-reference-frame > img {
            min-height: 620px;
          }

          .hero-copy {
            width: 78vw;
            top: 50%;
          }

          .hero-eyebrow {
            margin-bottom: 12px;
            letter-spacing: .28em;
          }

          .hero-copy h1 {
            font-size: clamp(34px, 10vw, 54px);
          }

          .hero-description {
            margin-top: 17px;
            font-size: 12px;
          }

          .hero-actions {
            margin-top: 18px;
            gap: 8px;
          }

          .hero-primary, .hero-secondary {
            min-height: 44px;
            padding: 0 16px;
            font-size: 11px;
          }

          .hero-primary span {
            width: 21px;
            height: 21px;
            font-size: 12px;
          }

          .hero-meta {
            gap: 7px;
            margin-top: 14px;
            font-size: 7px;
          }

          .hero-scroll-cue {
            bottom: 3%;
            transform: translateX(-50%) scale(.8);
          }
        }

        .hero-pink-wash {
          background:
            radial-gradient(circle at 8% 28%, rgba(255, 0, 127, .25), transparent 25%),
            radial-gradient(circle at 91% 20%, rgba(255, 117, 190, .28), transparent 25%),
            radial-gradient(circle at 50% 78%, rgba(255, 194, 225, .38), transparent 36%),
            linear-gradient(135deg, #fff5fa 0%, #fffafd 44%, #fff1f8 100%);
        }

        .hero-grid {
          opacity: .32;
          background-image:
            linear-gradient(rgba(255, 0, 127, .055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 127, .055) 1px, transparent 1px);
          background-size: 58px 58px;
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 75%, transparent);
        }

        .hero-decoration {
          position: absolute;
          z-index: -4;
          display: grid;
          place-items: center;
          pointer-events: none;
          filter: drop-shadow(0 22px 28px rgba(102, 25, 65, .16));
          will-change: transform;
        }

        .hero-decoration img {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: saturate(1.08) contrast(1.02);
        }

        .hero-decoration-ring {
          position: absolute;
          width: 78%;
          height: 78%;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,.82), rgba(255,111,180,.12) 52%, transparent 70%);
          box-shadow: 0 0 50px rgba(255, 0, 127, .13);
        }

        .hero-decoration-one {
          width: 170px;
          height: 170px;
          left: 2%;
          top: 21%;
          animation: heroFloatOne 7s ease-in-out infinite;
          transform: rotate(-10deg);
        }

        .hero-decoration-two {
          width: 220px;
          height: 190px;
          right: 1%;
          bottom: 16%;
          animation: heroFloatTwo 8.5s ease-in-out infinite;
          transform: rotate(8deg);
        }

        .hero-decoration-three {
          width: 150px;
          height: 180px;
          right: 7%;
          top: 15%;
          animation: heroFloatThree 7.5s ease-in-out infinite;
          transform: rotate(7deg);
        }

        .hero-decoration-four {
          width: 115px;
          height: 115px;
          left: 12%;
          bottom: 13%;
          animation: heroFloatFour 6.5s ease-in-out infinite;
          transform: rotate(-8deg);
        }

        .hero-spark {
          position: absolute;
          z-index: -3;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #ff007f;
          box-shadow: 0 0 0 7px rgba(255, 0, 127, .08), 0 0 24px rgba(255, 0, 127, .35);
          animation: sparkFloat 4s ease-in-out infinite;
        }

        .hero-spark-one { left: 24%; top: 17%; animation-delay: -.7s; }
        .hero-spark-two { right: 28%; top: 27%; width: 7px; height: 7px; animation-delay: -1.8s; }
        .hero-spark-three { left: 31%; bottom: 20%; width: 6px; height: 6px; animation-delay: -2.4s; }
        .hero-spark-four { right: 17%; bottom: 27%; width: 8px; height: 8px; animation-delay: -3.1s; }

        @keyframes heroFloatOne {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-10deg); }
          50% { transform: translate3d(12px, -22px, 0) rotate(-3deg); }
        }

        @keyframes heroFloatTwo {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(8deg); }
          50% { transform: translate3d(-16px, -20px, 0) rotate(14deg); }
        }

        @keyframes heroFloatThree {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(7deg); }
          50% { transform: translate3d(-10px, 20px, 0) rotate(-2deg); }
        }

        @keyframes heroFloatFour {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-8deg); }
          50% { transform: translate3d(14px, -16px, 0) rotate(2deg); }
        }

        @keyframes sparkFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: .45; }
          50% { transform: translateY(-15px) scale(1.35); opacity: 1; }
        }

        @media (max-width: 900px) {
          .hero-decoration-one { width: 120px; height: 120px; left: -20px; top: 17%; }
          .hero-decoration-two { width: 145px; height: 130px; right: -22px; bottom: 13%; }
          .hero-decoration-three { width: 105px; height: 125px; right: -12px; top: 13%; }
          .hero-decoration-four { width: 85px; height: 85px; left: -5px; bottom: 15%; }
        }

        @media (max-width: 640px) {
          .hero-decoration-one { width: 92px; height: 92px; left: -25px; top: 21%; }
          .hero-decoration-two { width: 105px; height: 92px; right: -26px; bottom: 16%; }
          .hero-decoration-three { width: 78px; height: 92px; right: -18px; top: 17%; }
          .hero-decoration-four { width: 62px; height: 62px; left: -12px; bottom: 19%; }
          .hero-grid { background-size: 42px 42px; }
        }

        @media (max-width: 640px) {
          .glass-nav {
            border-radius: 18px;
            box-shadow: 0 14px 35px rgba(93,64,55,.12);
          }

          .glass-nav > div:first-child {
            height: 68px;
            padding-left: 10px;
            padding-right: 10px;
          }

          .nav-brand {
            max-width: 205px;
          }

          .nav-brand-copy {
            display: block;
          }

          .nav-brand-copy > div:first-child {
            font-size: 13px;
          }

          .nav-brand-copy > div:last-child {
            font-size: 10px;
          }

          .mobile-menu-button {
            box-shadow: 0 6px 18px rgba(255,0,127,.12);
          }

          .home-reference-frame {
            min-height: 680px;
          }

          .home-reference-frame > img {
            min-height: 680px;
            object-position: 50% center;
          }

          .hero-copy {
            width: 84vw;
            top: 52%;
          }

          .hero-copy::before {
            inset: -55px -35px;
            background: radial-gradient(ellipse at center, rgba(255,246,251,.84) 0%, rgba(255,241,248,.55) 45%, transparent 76%);
          }

          .hero-eyebrow {
            font-size: 9px;
            letter-spacing: .24em;
          }

          .hero-copy h1 {
            font-size: clamp(36px, 11vw, 50px);
            line-height: .92;
          }

          .hero-description {
            max-width: 330px;
            font-size: 12px;
            line-height: 1.55;
          }

          .hero-meta {
            flex-wrap: wrap;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
            font-size: 8px;
          }

          .hero-ambient-ring-one { width: 120px; height: 120px; left: -35px; top: 22%; }
          .hero-ambient-ring-two { width: 90px; height: 90px; right: -20px; top: 27%; }
          .hero-ambient-orb-one { width: 150px; height: 150px; }
          .hero-ambient-orb-two { width: 190px; height: 190px; }

          .offer-number {
            width: 58px;
            height: 58px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-decoration, .hero-spark { animation: none !important; }
        }

        .hero-card {
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          animation: heroIn 1s cubic-bezier(.16,1,.3,1) both;
        }

        .hero-card::before,
        .hero-card::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(2px);
          opacity: .45;
        }

        .hero-card::before {
          right: -70px;
          top: -70px;
          background: radial-gradient(circle, rgba(255,0,127,.25), transparent 68%);
          animation: pulseBlob 5s ease-in-out infinite;
        }

        .hero-card::after {
          left: -70px;
          bottom: -90px;
          background: radial-gradient(circle, rgba(93,64,55,.16), transparent 68%);
          animation: pulseBlob 7s ease-in-out infinite reverse;
        }

        .glow-button {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 12px 28px rgba(255,0,127,.20);
        }

        .glow-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,.45) 50%, transparent 75%);
          transform: translateX(-120%);
          transition: transform .6s ease;
          z-index: -1;
        }

        .glow-button:hover::before {
          transform: translateX(120%);
        }

        .menu-showcase {
          transform: translateZ(0);
          transition: transform .45s ease, box-shadow .45s ease;
        }

        .menu-showcase:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 70px rgba(93,64,55,.16);
        }

        .menu-image {
          transition: transform .8s cubic-bezier(.16,1,.3,1), filter .5s ease;
          animation: menuImageIn .65s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes menuImageIn {
          from { opacity: 0; transform: scale(.975); }
          to { opacity: 1; transform: scale(1); }
        }

        .menu-showcase:hover .menu-image {
          transform: scale(1.025);
          filter: saturate(1.06) contrast(1.02);
        }

        .offer-card {
          isolation: isolate;
          transform: translateZ(0);
        }

        .offer-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 1px solid rgba(255,0,127,.08);
          pointer-events: none;
        }

        .offer-card-glow {
          position: absolute;
          width: 190px;
          height: 190px;
          right: -95px;
          top: -95px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,0,127,.22), transparent 68%);
          transition: transform .6s ease;
        }

        .offer-card:hover .offer-card-glow {
          transform: scale(1.45);
        }

        .offer-number {
          display: grid;
          place-items: center;
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: linear-gradient(135deg, #ff4da6, #ff007f 55%, #d9006c);
          color: white;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: -.04em;
          box-shadow: 0 14px 28px rgba(255,0,127,.22);
          animation: rewardPulse 3.5s ease-in-out infinite;
        }

        /* Product catalogue — one horizontal scrolling row. */
        .products-horizontal {
          display: flex;
          flex-wrap: nowrap;
          gap: 28px;
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 8px 4px 24px;
          scroll-snap-type: x proximity;
          scroll-padding-left: 4px;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 0, 127, .35) transparent;
        }

        .products-horizontal::-webkit-scrollbar {
          height: 7px;
        }

        .products-horizontal::-webkit-scrollbar-track {
          background: rgba(255, 0, 127, .05);
          border-radius: 999px;
        }

        .products-horizontal::-webkit-scrollbar-thumb {
          background: rgba(255, 0, 127, .35);
          border-radius: 999px;
        }

        .products-horizontal .product-card {
          flex: 0 0 300px;
          width: 300px;
          scroll-snap-align: start;
        }

        .product-card {
          opacity: 1;
          transform: translateY(0);
          animation: productCardIn .65s cubic-bezier(.16,1,.3,1) both;
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease;
          will-change: transform;
        }

        .product-card:hover {
          box-shadow: 0 24px 55px rgba(93,64,55,.16);
        }

        .product-card::after {
          content: "";
          position: absolute;
          inset: auto -25% -65% -25%;
          height: 150px;
          background: radial-gradient(circle, rgba(255,0,127,.12), transparent 65%);
          pointer-events: none;
          transition: transform .5s ease;
        }

        .product-card:hover::after {
          transform: translateY(-30px) scale(1.1);
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity .75s ease, transform .75s cubic-bezier(.16,1,.3,1);
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes productCardIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(28px) scale(.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes logoShine {
          0%, 60%, 100% { transform: translateX(-55%); }
          72% { transform: translateX(55%); }
        }

        @keyframes heroSheen {
          0%, 55%, 100% { transform: translateX(-100%); opacity: 0; }
          65% { opacity: 1; }
          82% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes ambientFloat {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(16px,-20px,0) scale(1.08); }
        }

        @keyframes ringDrift {
          0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(12px,-15px,0) rotate(12deg); }
        }

        @keyframes sparklePulse {
          0%, 100% { transform: scale(.65); opacity: .35; }
          50% { transform: scale(1.45); opacity: 1; }
        }

        @keyframes rewardPulse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }

        @keyframes navShimmer {
          0%, 55%, 100% { transform: translateX(-120%); }
          70% { transform: translateX(120%); }
        }

        @keyframes pulseBlob {
          0%, 100% { transform: scale(1); opacity: .35; }
          50% { transform: scale(1.22); opacity: .65; }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(5deg);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(5px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(5px) rotate(-360deg);
          }
        }

        @keyframes orbitReverse {
          from {
            transform: rotate(360deg) translateX(5px) rotate(-360deg);
          }
          to {
            transform: rotate(0deg) translateX(5px) rotate(0deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float 8s ease-in-out infinite reverse;
        }

        .animate-orbit {
          animation: orbit 7s linear infinite;
        }

        .animate-orbit-reverse {
          animation: orbitReverse 9s linear infinite;
        }

        .site-shell {
          background:
            radial-gradient(circle at 8% 8%, rgba(255, 0, 127, .12), transparent 24%),
            radial-gradient(circle at 92% 28%, rgba(255, 105, 180, .10), transparent 22%),
            linear-gradient(180deg, #fffaff 0%, #fff8fc 38%, #ffffff 72%, #fff7fb 100%);
        }

        .site-footer {
          background:
            radial-gradient(circle at 14% 0%, rgba(255, 0, 127, .30), transparent 28%),
            radial-gradient(circle at 86% 25%, rgba(255, 91, 173, .18), transparent 26%),
            linear-gradient(135deg, #241c2b 0%, #352036 48%, #201923 100%);
        }

        .site-footer::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff4da6, #ff007f, #ff8ac7, #ff007f, #ff4da6);
          background-size: 200% 100%;
          animation: footerGradient 8s linear infinite;
        }

        .footer-orb {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(2px);
          border: 1px solid rgba(255,255,255,.08);
        }

        .footer-orb-one {
          width: 360px;
          height: 360px;
          right: -160px;
          top: 120px;
          background: radial-gradient(circle, rgba(255,0,127,.16), transparent 68%);
          animation: footerFloat 9s ease-in-out infinite;
        }

        .footer-orb-two {
          width: 260px;
          height: 260px;
          left: -130px;
          bottom: -80px;
          background: radial-gradient(circle, rgba(255,113,184,.12), transparent 68%);
          animation: footerFloat 11s ease-in-out infinite reverse;
        }

        .footer-link {
          position: relative;
          transition: color .25s ease, transform .25s ease;
        }

        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: -5px;
          height: 1px;
          background: #ff4da6;
          transition: right .25s ease;
        }

        .footer-link:hover {
          color: #fff;
          transform: translateX(4px);
        }

        .footer-link:hover::after {
          right: 0;
        }

        .instagram-link {
          box-shadow: 0 10px 35px rgba(255,0,127,.10);
        }

        .instagram-icon {
          display: inline-flex;
          width: 28px;
          height: 28px;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,.28);
          font-size: 9px;
          letter-spacing: .08em;
          background: linear-gradient(135deg, #ff4da6, #ff007f, #8b2cff);
        }

        @keyframes footerGradient {
          from { background-position: 0% 50%; }
          to { background-position: 200% 50%; }
        }

        @keyframes footerFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -18px, 0) scale(1.04); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
          }
        }

        /* Product category strip — always one horizontal row. */
        .category-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }

        .category-scroll::-webkit-scrollbar {
          display: none;
        }

        .category-pill {
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .products-horizontal {
            gap: 18px;
            padding-right: 12px;
          }

          .products-horizontal .product-card {
            flex-basis: 290px;
            width: 290px;
          }
        }

        @media (max-width: 640px) {
          .products-horizontal {
            gap: 14px;
            padding-left: 2px;
            padding-right: 12px;
            scroll-snap-type: x mandatory;
          }

          .products-horizontal .product-card {
            flex-basis: min(82vw, 310px);
            width: min(82vw, 310px);
          }
        }

        /* Home showcase — only the home section uses these styles. */
        .hero-showcase-shell {
          min-height: 760px;
          padding: 118px 24px 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at 14% 22%, rgba(255, 0, 127, .10), transparent 28%),
            radial-gradient(circle at 88% 70%, rgba(255, 176, 210, .18), transparent 30%),
            linear-gradient(135deg, #fffaff 0%, #fff3f8 52%, #fff9fc 100%);
        }

        .hero-showcase-card {
          position: relative;
          width: 100%;
          max-width: 1390px;
          min-height: 620px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .9);
          border-radius: 34px;
          background:
            radial-gradient(circle at 56% 48%, rgba(255, 255, 255, .96), transparent 34%),
            linear-gradient(135deg, #fff7fb 0%, #fff1f6 48%, #ffeef5 100%);
          box-shadow: 0 35px 90px rgba(93, 64, 55, .13);
        }

        .hero-showcase-card::before {
          content: "";
          position: absolute;
          width: 620px;
          height: 620px;
          right: 17%;
          top: 3%;
          border-radius: 50%;
          border: 1px solid rgba(255, 0, 127, .09);
          box-shadow:
            0 0 0 28px rgba(255, 0, 127, .025),
            0 0 0 58px rgba(255, 0, 127, .018);
          pointer-events: none;
        }

        .hero-showcase-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.42) 48%, transparent 62%);
          transform: translateX(-130%);
          animation: showcaseSheen 8s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-showcase-top {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 34px 0;
        }

        .hero-showcase-stats {
          display: flex;
          gap: 30px;
        }

        .hero-showcase-stats div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-showcase-stats strong {
          color: #5d4037;
          font-size: 22px;
          line-height: 1;
        }

        .hero-showcase-stats span {
          margin-top: 5px;
          color: #927d78;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .hero-showcase-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: .82fr 1.2fr .55fr;
          align-items: center;
          min-height: 500px;
          padding: 18px 34px 22px;
        }

        .hero-showcase-copy {
          position: relative;
          z-index: 4;
          max-width: 350px;
        }

        .hero-showcase-kicker {
          margin: 0 0 13px;
          color: #ff007f;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .28em;
        }

        .hero-showcase-title-wrap {
          animation: showcaseTextIn .65s cubic-bezier(.16,1,.3,1) both;
        }

        .hero-showcase-copy h1 {
          margin: 0;
          color: #3f302c;
          font-size: clamp(40px, 4.2vw, 68px);
          font-weight: 950;
          letter-spacing: -.055em;
          line-height: .94;
        }

        .hero-showcase-copy p {
          max-width: 300px;
          margin: 18px 0 0;
          color: #806d68;
          font-size: 14px;
          line-height: 1.65;
        }

        .hero-showcase-price {
          display: flex;
          align-items: baseline;
          gap: 9px;
          margin-top: 19px;
        }

        .hero-showcase-price span {
          color: #9c8a85;
          font-size: 10px;
        }

        .hero-showcase-price strong {
          color: #ff007f;
          font-size: 24px;
          font-weight: 900;
        }

        .hero-showcase-actions {
          display: flex;
          gap: 10px;
          margin-top: 22px;
        }

        .hero-showcase-order,
        .hero-showcase-menu {
          min-height: 44px;
          padding: 0 19px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
        }

        .hero-showcase-order {
          border: 0;
          background: #ff007f;
          color: white;
          box-shadow: 0 12px 28px rgba(255,0,127,.22);
        }

        .hero-showcase-order span {
          margin-left: 8px;
        }

        .hero-showcase-menu {
          border: 1px solid rgba(93,64,55,.14);
          background: rgba(255,255,255,.65);
          color: #5d4037;
        }

        .hero-showcase-order:hover,
        .hero-showcase-menu:hover {
          transform: translateY(-2px);
        }

        .hero-showcase-product {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 480px;
          animation: showcaseProductIn .75s cubic-bezier(.16,1,.3,1) both;
        }

        .hero-product-halo {
          position: absolute;
          width: min(31vw,410px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,.98) 0%, rgba(255,220,235,.65) 48%, rgba(255,0,127,.06) 72%, transparent 73%);
        }

        .hero-product-halo::after {
          content: "";
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          border: 1px solid rgba(255,0,127,.10);
        }

        .hero-product-shadow {
          position: absolute;
          bottom: 48px;
          width: 210px;
          height: 30px;
          border-radius: 50%;
          background: rgba(93,64,55,.15);
          filter: blur(18px);
          animation: showcaseShadow 3.8s ease-in-out infinite;
        }

        .hero-product-image {
          position: relative;
          z-index: 2;
          width: min(31vw,430px);
          max-height: 470px;
          object-fit: contain;
          filter: drop-shadow(0 28px 22px rgba(93,64,55,.17));
          animation: showcaseFloat 4.8s ease-in-out infinite;
        }

        .hero-showcase-flavours {
          position: relative;
          z-index: 4;
          justify-self: end;
          width: 180px;
        }

        .hero-showcase-flavours > p {
          margin: 0 0 12px;
          color: #806d68;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .hero-flavour-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hero-flavour {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 9px;
          padding: 7px 9px;
          border: 1px solid transparent;
          border-radius: 999px;
          background: rgba(255,255,255,.58);
          color: #806d68;
          text-align: left;
          transition: all .3s ease;
        }

        .hero-flavour:hover {
          background: rgba(255,255,255,.9);
          transform: translateX(-3px);
        }

        .hero-flavour.active {
          border-color: rgba(255,0,127,.12);
          background: rgba(255,255,255,.94);
          color: #5d4037;
          box-shadow: 0 9px 25px rgba(93,64,55,.08);
          transform: translateX(-7px);
        }

        .hero-flavour-image {
          display: grid;
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          place-items: center;
          overflow: hidden;
          border-radius: 50%;
          background: #fff5f9;
        }

        .hero-flavour-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .hero-flavour > span:last-child {
          overflow: hidden;
          font-size: 10px;
          font-weight: 700;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .hero-showcase-bottom {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: center;
          gap: 28px;
          padding: 0 28px 24px;
          color: #8c7772;
          font-size: 10px;
          font-weight: 700;
        }

        .hero-showcase-bottom > div {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .hero-bottom-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff007f;
          box-shadow: 0 0 0 5px rgba(255,0,127,.07);
        }

        .hero-showcase-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(10px);
          pointer-events: none;
        }

        .hero-showcase-glow-one {
          width: 240px;
          height: 240px;
          left: -110px;
          bottom: -100px;
          background: rgba(255,0,127,.12);
        }

        .hero-showcase-glow-two {
          width: 220px;
          height: 220px;
          right: -90px;
          top: 70px;
          background: rgba(255,170,210,.20);
        }

        @keyframes showcaseProductIn {
          from { opacity: 0; transform: translateY(20px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes showcaseTextIn {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes showcaseFloat {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-11px) rotate(1deg); }
        }

        @keyframes showcaseShadow {
          0%, 100% { transform: scaleX(1); opacity: .55; }
          50% { transform: scaleX(.78); opacity: .35; }
        }

        @keyframes showcaseSheen {
          0%, 58%, 100% { transform: translateX(-130%); }
          72% { transform: translateX(130%); }
        }

        @media (max-width: 900px) {
          .hero-showcase-shell {
            min-height: auto;
            padding: 94px 12px 24px;
          }

          .hero-showcase-card {
            min-height: auto;
            border-radius: 28px;
          }

          .hero-showcase-top {
            min-height: 42px;
            padding: 18px 18px 0;
          }

          .hero-showcase-top-spacer {
            flex: 1;
          }

          .hero-showcase-stats {
            gap: 18px;
          }

          .hero-showcase-stats strong {
            font-size: 17px;
          }

          .hero-showcase-content {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 14px 18px 12px;
            text-align: center;
          }

          .hero-showcase-copy {
            max-width: 100%;
            order: 1;
          }

          .hero-showcase-copy p {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-showcase-price,
          .hero-showcase-actions {
            justify-content: center;
          }

          .hero-showcase-product {
            order: 2;
            min-height: 330px;
            margin-top: -2px;
          }

          .hero-product-image {
            width: min(62vw, 320px);
            max-height: 320px;
          }

          .hero-product-halo {
            width: min(66vw, 330px);
          }

          .hero-product-shadow {
            bottom: 28px;
          }

          .hero-showcase-flavours {
            order: 3;
            justify-self: stretch;
            width: 100%;
            margin-top: 4px;
          }

          .hero-showcase-flavours > p {
            margin-bottom: 9px;
            text-align: left;
          }

          /* The four showcase choices remain one horizontal row. */
          .hero-flavour-list {
            display: flex;
            flex-direction: row;
            gap: 8px;
            width: 100%;
            overflow-x: auto;
            padding: 2px 2px 8px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .hero-flavour-list::-webkit-scrollbar {
            display: none;
          }

          .hero-flavour {
            width: auto;
            min-width: 54px;
            flex: 0 0 auto;
            justify-content: center;
            padding: 6px;
          }

          .hero-flavour > span:last-child {
            display: none;
          }

          .hero-flavour.active {
            transform: translateY(-2px);
          }

          .hero-showcase-bottom {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            gap: 18px;
            width: 100%;
            overflow-x: auto;
            padding: 0 18px 18px;
            scrollbar-width: none;
            -ms-overflow-style: none;
            white-space: nowrap;
          }

          .hero-showcase-bottom::-webkit-scrollbar {
            display: none;
          }

          .hero-showcase-bottom > div {
            flex: 0 0 auto;
          }
        }

        @media (max-width: 520px) {
          .hero-showcase-shell {
            padding: 88px 8px 16px;
          }

          .hero-showcase-card {
            border-radius: 22px;
          }

          .hero-showcase-top {
            padding: 14px 14px 0;
          }

          .hero-showcase-stats {
            gap: 13px;
          }

          .hero-showcase-stats strong {
            font-size: 15px;
          }

          .hero-showcase-stats span {
            font-size: 8px;
            letter-spacing: .05em;
          }

          .hero-showcase-content {
            padding: 12px 14px 8px;
          }

          .hero-showcase-kicker {
            margin-bottom: 9px;
            font-size: 9px;
            letter-spacing: .22em;
          }

          .hero-showcase-copy h1 {
            font-size: clamp(36px, 12vw, 49px);
            line-height: .92;
          }

          .hero-showcase-copy p {
            max-width: 290px;
            margin-top: 13px;
            font-size: 12px;
            line-height: 1.5;
          }

          .hero-showcase-price {
            margin-top: 13px;
          }

          .hero-showcase-price strong {
            font-size: 21px;
          }

          .hero-showcase-actions {
            margin-top: 15px;
          }

          .hero-showcase-order,
          .hero-showcase-menu {
            min-height: 41px;
            padding: 0 15px;
            font-size: 11px;
          }

          .hero-showcase-product {
            min-height: 270px;
          }

          .hero-product-image {
            width: min(72vw, 290px);
            max-height: 285px;
          }

          .hero-product-halo {
            width: min(76vw, 300px);
          }

          .hero-product-shadow {
            bottom: 22px;
            width: 155px;
          }

          .hero-showcase-flavours {
            margin-top: 0;
          }

          .hero-showcase-flavours > p {
            font-size: 9px;
          }

          .hero-flavour {
            min-width: 48px;
          }

          .hero-flavour-image {
            width: 36px;
            height: 36px;
            flex-basis: 36px;
          }

          .hero-showcase-bottom {
            gap: 15px;
            padding: 0 14px 15px;
            font-size: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-showcase-card::after,
          .hero-product-image,
          .hero-product-shadow {
            animation: none !important;
          }
        }

      `}</style>
    </div>
  );
}

export default App;
