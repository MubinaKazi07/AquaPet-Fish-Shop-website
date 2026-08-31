import { useMemo, useState } from "react";
import "./Gallery.css";

const categories = ["ALL", "PLANTS", "DECOR", "SETUPS", "FOOD & CARE", "UNDERWATER", "AQUASCAPING"];

// Curated gallery items. Each item is assigned to a single, correct category.
// Use targeted Unsplash queries (source.unsplash.com) so images match their category.
const galleryItems = [
  // PLANTS
  { category: "PLANTS", title: "Carpeted planted aquarium", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-bVHrItR8OGu1y3a4YbAyq3iC-foTQd_x_YrWLE-pQ&s=10" },
  { category: "PLANTS", title: "Foreground moss and stems", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyB7AWTPuzVoP7dgxwSE06fAPSllBd4quuXI1AnjM8Q&s" },
  { category: "PLANTS", title: "Healthy aquatic foliage", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTznXrPB_WM_BhhnhLIZhyuS-oveVDtUfU48_H164QOTQ&s" },
{ category: "PLANTS", title: "Christmas Moss", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNM3j10BbpNMIQ6-Kld7baL32W2-1gZdqm5YITiYyg3Q&s=10" },
{ category: "PLANTS", title: "Anubias Nana", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWLbQoaNEK50Cji212uelWBXhQgI8oqbHQjBbDQ3D0Gg&s=10" },
  { category: "PLANTS", title: "java fern", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3eG8BGn7X4glRAYnqxX--3-e8MOGKnReqANXC2NxPig&s=10" },
  { category: "PLANTS", title: "Staurogyne Repens", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTznXrPB_WM_BhhnhLIZhyuS-oveVDtUfU48_H164QOTQ&s" },
{ category: "PLANTS", title: "Bucephalandra", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5YNus6dohSGSox7qw8He7Ge1qChJu-Yty0FZIJJwyA&s=10" },
{ category: "PLANTS", title: "Amazon Sword", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_WtBSx0hVjhOW7xTUo-foErih8r1vR-2Nut5BIdL5Xw&s=10" },
  { category: "PLANTS", title: "Vallisneria", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6L7IYYbRNQ-Ke6MZNBYxrEXXWKoCI_ZdCtw83aZfpPw&s=10" },
  { category: "PLANTS", title: "Rotala Rotundifolia", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwiygeF3Fj19-VO_FrHfFV1gpAPHT-CsoWdbs27cG8A&s=10" },
{ category: "PLANTS", title: "Bacopa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBocuua773dBdXimW4ucsPXdynIjAKGN5Ocqi9z8uyg&s=10" },

  // DECOR
  { category: "DECOR", title: "Driftwood centrepiece", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmvVFcG367sazsOr4VLF6JZPE2w1YqxMFhguDGucDtA&s=10" },
  { category: "DECOR", title: "Natural rock cave", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31whNmzQSNXx-bHVopHx_lAuY9HXgnswCB9ukI_JCFA&s" },
  { category: "DECOR", title: "Dragon Stone", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQstVOV_l9pGFCyWteZ_CPkeT8uIrxeI0LGAEzjc8ADdw&s=10" },
  { category: "DECOR", title: "Terracotta Pots", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAeZLGxZoQkCtoKL57RB_UeTlkNsR2gkKqy12ffiYEKA&s" },
  { category: "DECOR", title: "Aquarium Castle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xh2Cz_Se-HrFFWhl1P08NVAmhkn9mNugdbeUUIhX-yY1-vLMdZ_MOiE&s=10" },
  { category: "DECOR", title: "Artificial Coral", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zxPSpcgv9Y9sf80OSPfXWYVoT5O1yr33iSw3ginwDA&s=10" },
  { category: "DECOR", title: "Seiryu Stone", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhq_kkpSPRwRuGNQ01M0l_y_NDE2odvfwXEKux2Z3MVA&s=10" },
  { category: "DECOR", title: "Coconut Cave", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIUy716HeZ8FiBs_vppawSyu_V8-du62v6kizACmfug&s=10" },
{ category: "DECOR", title: "Lava Rock", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9DUzxI7ljyblktwdJEL_pxBQRW-OTzNKSc8mL8boMaA&s=10" },
{ category: "DECOR", title: "Artificial Seaweed", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN76NPKGrDV7tJh5tzd54RWlWuPVro6zxr_MywqSKPGw&s=10" },
{ category: "DECOR", title: "Colored Pebbles", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8Zaf2skKSR9eJM7Nbv17jyxo4gAmdtV7155mwd8AHA&s" },
{ category: "DECOR", title: "Decorative Pebbles", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8c3n1lVpWsJCXRQi45sAZmr5a2ucKRMrDPGNIRAw2w&s=10" },
{ category: "DECOR", title: "Sand", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLVmAqVZvsqQ9Iwwynci4hERxI6EPTOe1Mj-X4IwycRw&s=10" },
{ category: "DECOR", title: "Bubble Stone", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaz7tKKlwNSD6FNNxvOCp1LcnvxgDmON0yiIwL_znrnQ&s=10" },
 {category: "DECOR", title: "Shells", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2RaWkypSwvvjIUhd-yYs2ZfpioRmxgbUbkvS-ubhnQ&s=10" },





  // SETUPS
  { category: "SETUPS", title: "Glass Aquarium Tanks", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWWIqF7gnOdEBUBExH-_h2PPE2ONn9oZ72NG1RfTQyoA&s=10" },
  { category: "SETUPS", title: "Large display tanks", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYsJj5q-DX_cDqaDnOsS3edhH5H8XIviJybBQK9MKT7Q&s=10" },
  { category: "SETUPS", title: "Tropical Aquarium Setup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVbVEtxejXQpc3n8QDDF4kf2s3wN5cWvRYDSSa-Ktfw&s=10" },
  { category: "SETUPS", title: "Aquarium + LED Light", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzMNU00GmGKjq71b6hof_uamWvHc6_HwWilS8bO4BqQ&s=10" },
{ category: "SETUPS", title: "Aquarium + CO₂ Setup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUCjyDzeR5xGCrZzMGCvL9pbS_HZsFK0Ngxk878VIpow&s=10" },
{ category: "SETUPS", title: "Aquarium Filter", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLwBteyVAspgS_XFc2JENgJmLuxmkM6ZNHsuM3oINr2g&s=10" },
{ category: "SETUPS", title: "Rimless Glass Aquarium", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsrg8dJ9ZyvX-zgjkVn0ERPDyJisEtdGrRiTy18NwY_Q&s=10" },
{ category: "SETUPS", title: "Aquarium Heater", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaXTy0vVDU-aAJ_nUMpzOmGV_n7m84KZrUleoWqkBi-w&s=10" },


  // FOOD & CARE
  { category: "FOOD & CARE", title: "Fish Food Flakes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8xlH04CxpyMWB22utWftcK9vydHd5c0aenBgJRlZnbg&s=10" },
  { category: "FOOD & CARE", title: "Fish Food Pellets", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPZGQnSXkp8li78TpQrOCfKmkMq1AqkgF9AB-jaoHWHQ&s=10" },
  { category: "FOOD & CARE", title: "Trophical Fish Food", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRmEPDy6McS9h2gX9V7wPywvpXkVZiMxA8Mh12EBJyA&s=10" },
  { category: "FOOD & CARE", title: "Bottom Feeder Tablets", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf3zsP4mbpl0I6lGH2R245fm_mznYXpt9SdNDNGWQbxw&s=10" },
  { category: "FOOD & CARE", title: "Algae Wafers", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-so-jKXrk8_FyAcYwjjYxIx2dI8frQXlQN3PzWO9lww&s=10" },
  { category: "FOOD & CARE", title: "Fish Food Granules", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6uBJYwuWaR3WCQFhcrDOmiKWvwOgwgGgD2Wi3UW6TPg&s=10" },
  { category: "FOOD & CARE", title: "Growth Fish Food", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUf1ndiexr6WNp4w4Z4zP3uQ3I345qGyRVvGDeKF0cWg&s=10" },
  { category: "FOOD & CARE", title: "pH Test Kit ", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXkxstX7JDe9ht2K-AhyS-tA_C97zcGCMg-VRNV-lRfg&s=10" },
 { category: "FOOD & CARE", title: "Algae Removal", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNS22co4wj_meTqnD2sYY_Z-Kqf1hZF5fziuMn1XvIA&s" },
  { category: "FOOD & CARE", title: "Air Stone", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnWIIhptKEZn-qLw7SKiZ5Y7yqQpOM8YbeNo3SPjs7Q&s=10" },
  // UNDERWATER
  { category: "UNDERWATER", title: "Coral reef scene", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6hw9YGgKk5Uc-vaH8NuAQU0stCmVWtU2E348mRD7xA&s=10" },
  { category: "UNDERWATER", title: "JellyFish", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG-UVSJZjvPHb361S8Kks-_nnqOTy1qDpuZfeDuRKVmg&s=10" },
{ category: "UNDERWATER", title: "Scuba Diving", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgyH5EPiW9fglDKGBX39ZFTOVnBycZr40cuYORpgWv9g&s=10" },
{ category: "UNDERWATER", title: "Kelp Forest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6AqB1SjC9idbV5BpnLqoylDarf19jzMiXPQH43W6qkQ&s=10" },
{ category: "UNDERWATER", title: "Sea Turtle Underwater", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVItixSzKH9FG899TPFoUj7C6SsZtP61KkY9rDKvgnTw&s=10" },
{ category: "UNDERWATER", title: "Sunlight Underwater", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzG6JBikkhYjB6wcXKqbDfQ4NuhoXOxmzrwDrDO543A&s=10" },
{ category: "UNDERWATER", title: "Underwater Shipwreck", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpntHVSGwE7UyxCFfUWgGm2K6mEcVUmGOBDW1cvTXCBg&s=10" },
  // AQUASCAPING
  { category: "AQUASCAPING", title: "Nature aquascape", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStWpdBcDsZUdIV4_je1nmyuTSCw8VOXiLhBGpNdSyC_Q&s=10" },
  { category: "AQUASCAPING", title: "Iwagumi Aquascape", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4YKaWv5Ur-KRGD3safVKt_m3I0x9j3o6wJ4s_T3JeAA&s=10" },
  { category: "AQUASCAPING", title: "Mountain Aquascape", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA7ZcNZG2EVbAQ1eaXxtiWHTdsIMPkbTWPBdWpAu4o7A&s=10" },
  { category: "AQUASCAPING", title: "Riverbank Aquascape", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13kOv5qwKzTVcc-eCJsQLao9c-V4OcX5zAdRvJHADaA&s=10" },
  { category: "AQUASCAPING", title: "Minimalist Aquascape", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZeKARKtrfbi1J1PRDsEh0yp8Cr5u01qPdLWEA6EJifw&s=10" },
  { category: "AQUASCAPING", title: "Nano Aquascape", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuQFXvycM0yzhkyLIrD4qEWyj7SVC8119huGm7J2bJFg&s=10" },

];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState(null);

  const visibleItems = useMemo(
    () => activeCategory === "ALL" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <main className="gallery-page site-section">
      <div className="container">
        <header className="gallery-intro text-center">
          <span className="section-kicker">A splash of inspiration</span>
          <h1 className="section-heading mt-2">Inside the AquaPet world</h1>
          <p>Explore our favourite aquatic spaces, care rituals, and underwater moments.</p>
        </header>

        <div className="gallery-filters" aria-label="Gallery categories">
          {categories.map((category) => (
            <button
              className={`gallery-filter${activeCategory === category ? " is-active" : ""}`}
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <section className="gallery-grid" aria-live="polite">
          {visibleItems.map((item) => (
            <button className="gallery-card" key={`${item.category}-${item.title}`} type="button" onClick={() => setSelectedItem(item)}>
              <img src={item.image} alt={item.title} />
              <span className="gallery-card-overlay"><small>{item.category}</small><strong>{item.title}</strong></span>
            </button>
          ))}
        </section>
      </div>

      {selectedItem && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={selectedItem.title} onClick={() => setSelectedItem(null)}>
          <button className="gallery-lightbox-close" type="button" aria-label="Close image" onClick={() => setSelectedItem(null)}>×</button>
          <img src={selectedItem.image} alt={selectedItem.title} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}

export default Gallery;
