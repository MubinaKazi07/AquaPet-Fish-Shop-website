import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

const fish = [
  ["Golden Fish", 499, 4.9, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2jo62ndOTUwgnRREIskqGj3cHMtZvW1whvmeAR5c0g&s=10", "Healthy, vibrant gold fish perfect for home aquariums."],
  ["Betta Fish", 699, 4.7, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQILmUzzBq8FVEiJr2uwYM4Cu7sANSxqFiqFmOF7Eyx2P8JhBUTYDdCTQtL&s=10", "Vibrant colours and flowing fins for a small tank."],
  ["Angel Fish", 899, 4.8, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSncRZ70vtbikDSHuDnURKaiJJQsd9dLisaXMw2XlSAsc1o_rrmapr270MM&s=10", "A graceful freshwater fish for peaceful tanks."],
  ["Guppy Fish", 299, 4.6, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfhqE-3niZhxrFp-IeJzXmO2_YyTyqlSb27N-cdrVRuMsYewuVL8OM_Lru&s=10", "Colourful, active and easy to care for."],
  ["Neon Tetra Fish", 399, 4.9, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7TT1kzTdyMO9yI-TzCi1CvDJ1iK8tx33Wj9O4fEIHuQ&s=10", "A bright schooling fish for community aquariums."],
  ["Molly Fish", 369, 4.5, "https://aquadesign.pk/wp-content/uploads/2025/04/1-25-300x300.webp", "A peaceful and hardy freshwater fish."],
  ["Koi Fish", 1499, 5, "https://cdn.britannica.com/99/234299-050-9CDD78E1/Koi-fish-swimming-carp.jpg", "Premium ornamental fish with striking patterns."],
  ["Discus Fish", 2499, 4.9, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYniOk060TetF9XJz4HjSmJVUY0prq6i5i3-ZkgtC7rQyeNbTnbvy7f2E&s=10", "An elegant fish admired for brilliant colours."],
  ["Platy Fish", 399, 4.4, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOi4rwaAbytOTBF7sWBmKlOQMxxbeQKlXA1wbaN4lBXg&s=10", "A friendly, colourful fish for a lively community aquarium."],
  ["Oscar Fish", 999, 4.8, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqp71Wp5jIn1wvmj0Fj_7GpRIKLgdA7a0yPEXIKyJSg&s=10", "An intelligent and active fish with a bold personality."],
  ["Zebra Danio", 199, 4.7, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSey6J0a6rPf3fKIPniOjD3TqZVT0ywOPw4O5MoM4dExw&s=10", "A fast, striped and hardy fish for community tanks."],
  ["Gourami Fish", 599, 4.8, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnttPO5c5Gm9OOhQOUCGl1HAa4Jq0P6Ov1XX0QpC9uCw&s=10", "A peaceful freshwater fish with beautiful flowing fins."],
  ["Arowana Fish", 4999, 4.6, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP1uF5RqMOxlXYLxuKbc1VRaVQVTPcwY9O1N3J3ISNFw&s=10", "A majestic, premium fish for a spacious show aquarium."],
  ["Swordtail Fish", 349, 4.6, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUqeyyEKQYI0IsrdN_pc00VgjNTp-tz84e3MO9pUgVtA&s=10", "An active freshwater fish known for its distinctive tail."],
  ["Corydoras Catfish", 599, 5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjup-e_sKD3bRIrWyYDriZPodh6gKe-C74i7Vj5tXzWw&s=10", "A peaceful bottom-dweller that suits community aquariums."],
  ["Flowerhorn Fish", 2999, 4.9, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgak84RwspDODjSDfRaqvrSbzcMxLDu_vH9vtv6Nut4A&s=10", "A unique ornamental fish with vivid colours and character."],
].map(([name, price, rating, image, description]) => ({ name, price, rating, image, description }));

const shopEssentials = [
  ["Driftwood centrepiece", 99, 4.8, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmvVFcG367sazsOr4VLF6JZPE2w1YqxMFhguDGucDtA&s=10", "Decoration"],
  ["Natural rock cave", 49, 4.6, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31whNmzQSNXx-bHVopHx_lAuY9HXgnswCB9ukI_JCFA&s", "Decoration"],
   ["Dragon Stone", 89, 4.6, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQstVOV_l9pGFCyWteZ_CPkeT8uIrxeI0LGAEzjc8ADdw&s=10", "Decoration"],
    ["Terracotta Pots", 76, 4, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAeZLGxZoQkCtoKL57RB_UeTlkNsR2gkKqy12ffiYEKA&s", "Decoration"],
     ["Aquarium Castle", 87, 4.9, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xh2Cz_Se-HrFFWhl1P08NVAmhkn9mNugdbeUUIhX-yY1-vLMdZ_MOiE&s=10", "Decoration"],
      ["Seiryu Stone", 987, 4.3, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhq_kkpSPRwRuGNQ01M0l_y_NDE2odvfwXEKux2Z3MVA&s=10", "Decoration"],
  ["Carpeted planted aquarium", 299, 4.7, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-bVHrItR8OGu1y3a4YbAyq3iC-foTQd_x_YrWLE-pQ&s=10", "Plants"],
  ["Healthy aquatic foliage", 249, 4.5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTznXrPB_WM_BhhnhLIZhyuS-oveVDtUfU48_H164QOTQ&s", "Plants"],
   ["Christmas Moss", 249, 4.5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNM3j10BbpNMIQ6-Kld7baL32W2-1gZdqm5YITiYyg3Q&s=10", "Plants"],
    ["Staurogyne Repens", 249, 4.5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTznXrPB_WM_BhhnhLIZhyuS-oveVDtUfU48_H164QOTQ&s", "Plants"],
     ["Amazon Sword", 249, 4.5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_WtBSx0hVjhOW7xTUo-foErih8r1vR-2Nut5BIdL5Xw&s=10", "Plants"],
      ["Rotala Rotundifolia", 249, 4.5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwiygeF3Fj19-VO_FrHfFV1gpAPHT-CsoWdbs27cG8A&s=10", "Plants"],
  ["Premium Fish Food", 399, 4.2, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8xlH04CxpyMWB22utWftcK9vydHd5c0aenBgJRlZnbg&s=10", "Food"],
   ["Trophical Fish Food", 399, 4.2, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRmEPDy6McS9h2gX9V7wPywvpXkVZiMxA8Mh12EBJyA&s=10", "Food"],
    ["Algae Wafers", 399, 4.2, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-so-jKXrk8_FyAcYwjjYxIx2dI8frQXlQN3PzWO9lww&s=10", "Food"],
     ["Bottom Feeder Tablets", 399, 4.2, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf3zsP4mbpl0I6lGH2R245fm_mznYXpt9SdNDNGWQbxw&s=10", "Food"],
      ["Fish Food Flakes", 399, 4.2, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8xlH04CxpyMWB22utWftcK9vydHd5c0aenBgJRlZnbg&s=10", "Food"],
      ["Fish Food Pellets", 399, 4.2, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPZGQnSXkp8li78TpQrOCfKmkMq1AqkgF9AB-jaoHWHQ&s=10", "Food"],
  ["pH Test Kit", 499, 4.5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXkxstX7JDe9ht2K-AhyS-tA_C97zcGCMg-VRNV-lRfg&s=10", "Care"],
  ["Air Stone", 299, 4.5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnWIIhptKEZn-qLw7SKiZ5Y7yqQpOM8YbeNo3SPjs7Q&s=10", "Care"],
 
].map(([name, price, rating, image, category]) => ({ name, price, rating, image, category, description: `A quality ${category.toLowerCase()} essential for a healthy, beautiful aquarium.` }));

const shopCategories = [
  { name: "All products", icon: "fa-border-all" }, { name: "Fish", icon: "fa-fish" },
  { name: "Decoration", icon: "fa-gem" }, { name: "Plants", icon: "fa-leaf" },
  { name: "Food", icon: "fa-bowl-food" }, { name: "Care", icon: "fa-droplet" },
];

function Product({ cart, setCart, onAddToCart }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All products");
  const [addedProducts, setAddedProducts] = useState([]);
  
  useEffect(() => {
    axios
      .get("https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users")
      .then(({ data }) => setAddedProducts(data))
      .catch(() => setAddedProducts([]));
  }, []);

  const products = useMemo(
    () =>
      [...fish.map((product) => ({ ...product, category: "Fish" })), ...shopEssentials, ...addedProducts.filter((product) => product.type !== "cart" && product.type !== "admin").map((product) => ({ ...product, category: product.category || "Fish" }))]
        .filter((product) => activeCategory === "All products" || product.category === activeCategory)
        .filter((product) => product.name?.toLowerCase().includes(search.toLowerCase())),
    [activeCategory, addedProducts, search]
  );

  const addToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product).catch(() => toast.error("Could not add product to cart."));
    } else {
      setCart([...cart, product]);
    }
    toast.success("Product is added to cart!");
  };

  const price = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

  return (
    <main className="product-page py-5">
      <div className="container">
        <div className="text-center product-intro">
          <span className="section-kicker">AquaPet collection</span>
          <h1 className="section-heading mt-2">Our fish</h1>
          <p>Choose a healthy new addition for your aquarium.</p>
          <input
            className="form-control mx-auto"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search fish..."
            aria-label="Search fish"
          />
        </div>
        <div className="shop-layout">
          <aside className="shop-sidebar" aria-label="Shop categories">
            <p className="shop-sidebar-label">Shop by category</p>
            <nav className="shop-category-list">
              {shopCategories.map((category) => <button type="button" key={category.name} className={`shop-category-btn ${activeCategory === category.name ? "active" : ""}`} onClick={() => setActiveCategory(category.name)}><i className={`fas ${category.icon}`} aria-hidden="true" />{category.name}</button>)}
            </nav>
            <div className="shop-sidebar-note"><i className="fas fa-truck-fast" aria-hidden="true" /><span><strong>Aquarium essentials</strong>delivered safely to your door.</span></div>
          </aside>
          <div className="row g-4 flex-grow-1">
          {products.map((product, index) => (
            <div className="col-sm-6 col-xl-4" key={product.id || `${product.name}-${index}`}>
              <article className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://images.unsplash.com/photo-1520302519886-71a4c51a8f20?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="product-card-body">
                  <h2>{product.name}</h2>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>{price(product.price)}</strong>
                    <Rating
                      value={Number(product.rating) || 0}
                      precision={0.5}
                      readOnly
                      size="small"
                      
                    />
                  </div>
                  <p>{product.description || "A carefully selected fish for your aquarium."}</p>
                  <div className="d-flex gap-2">
                    <button
                      className="product-action-btn product-action-btn-primary flex-fill"
                      onClick={() => addToCart(product)}
                    >
                      <i className="fas fa-cart-plus me-1" /> Add to cart
                    </button>
                    <button
                      className="product-action-btn product-action-btn-secondary"
                      onClick={() =>
                        navigate("/payment", {
                          state: { buyNowProduct: product },
                        })
                      }
                      aria-label={`Buy ${product.name} now`}
                    >
                      <i className="fas fa-bag-shopping" />
                      <span className="d-none d-xl-inline">Buy now</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
          </div>
        </div>
        {products.length === 0 && (
          <p className="text-center text-muted py-5">No fish match your search.</p>
        )}
      </div>
      <style>{`
        .product-page {
          min-height: 70vh;
        }
        .product-intro {
          margin-bottom: 2.5rem;
        }
        .product-intro p {
          color: #6e8493;
        }
        .product-intro input {
          max-width: 500px;
          padding: 0.75rem 1rem;
          border-color: #cfe3e5;
          border-radius: 12px;
        }
        .shop-layout { display: flex; align-items: flex-start; gap: 1.5rem; }
        .shop-sidebar { position: sticky; top: 100px; flex: 0 0 220px; padding: 1.25rem; border: 1px solid #dcebed; border-radius: 16px; background: #fff; box-shadow: 0 10px 24px rgba(14, 71, 93, 0.06); }
        .shop-sidebar-label { margin: 0 0 0.85rem; color: #123451; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
        .shop-category-list { display: grid; gap: 0.4rem; }
        .shop-category-btn { display: flex; align-items: center; gap: 0.7rem; width: 100%; padding: 0.7rem 0.75rem; border: 0; border-radius: 10px; background: transparent; color: #4b6676; font-weight: 700; text-align: left; transition: 0.2s ease; }
        .shop-category-btn i { width: 16px; color: #087b78; }
        .shop-category-btn:hover, .shop-category-btn.active { background: #e6f7f5; color: #063f63; }
        .shop-category-btn.active { box-shadow: inset 3px 0 0 #087b78; }
        .shop-sidebar-note { display: flex; gap: 0.6rem; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #dcebed; color: #6e8493; font-size: 0.8rem; line-height: 1.45; }
        .shop-sidebar-note i { margin-top: 0.1rem; color: #087b78; }
        .shop-sidebar-note strong { display: block; color: #123451; }
        .product-card {
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }
        .product-card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          display: block;
        }
        .product-card-body {
          padding: 1.5rem;
        }
        .product-card-body h2 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #123451;
          margin: 0 0 0.75rem;
        }
        .product-action-btn {
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
        }
        .product-action-btn-primary {
          background-color: #087b78;
          color: white;
        }
        .product-action-btn-primary:hover {
          background-color: #066360;
        }
        .product-action-btn-secondary {
          background-color: #f0f3f5;
          color: #0a7f82;
        }
        .product-action-btn-secondary:hover {
          background-color: #e8ecf0;
        }
        @media (max-width: 768px) {
          .shop-layout { display: block; }
          .shop-sidebar { position: static; margin-bottom: 1.5rem; }
          .shop-category-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .shop-sidebar-note { display: none; }
          .product-card img {
            height: 200px;
          }
          .product-card-body {
            padding: 1rem;
          }
        }
      `}</style>
    </main>
  );
}

export default Product;
