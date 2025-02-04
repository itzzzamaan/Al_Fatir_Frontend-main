import Footer from "./Footer";
import Header from "./Header";

const AboutUs = () => {
  const contentArray = [
    "The Origin of us. Fatir is the Arabic word for ‘Originator’. The origins of the word trace back to The Holy Qur’an, in the 35th surah (chapter). And we live not just by the name, but also its meaning.",
    "Our goal at Fatir At Fatir, we believe that Allah-Taala resides in everyone, which makes it obvious that work is worship for us and our ‘service before self’ attitude is our medium of reaching and feeling his holiness on all of us. And you can witness this from our exquisite line of fragrances to suit your needs.",
    "Fragrance that not just helps you gain attention, but respect and health as well. We take health as the biggest priority and so you can find in our products which will soothe your skin soul and also everybody around you.",
    "A fragrance for every Man and Woman. Fragrances have been known to be used by men and women for hundreds of years. Each one specializes in providing the essence of characteristics for men like wisdom, charisma, and nobility whereas for women; the essence of intellect, beauty, and charm are prominent.",
    "It’s DYNAMIC, it’s VERSATILE!! Fragrances are dynamic and versatile in their ability to provide options that are available for both men and women. The French aren’t the only ones providing a wide range of fragrances.",
    "A fragrance that’s got some CLASS to it. Your home has everything best-in-class. The best suits and shoes from Italy, the best car from Germany, the best watches from Switzerland but what about something that gives you a unique class through your smell. This is where Fatir comes into play. A fragrance exquisitely for any occasion for exhibition of status and sophistication gives even the best perfumes a run for their bucks.",
    "Scent for the essence of emotion and expression. Fragrances are always known to be exquisitely unique for every emotion and aura. From joyous to gloomy, there’s a unique scent for every emotion. Whether you’re into nostalgia or trying to gain attention at present, there’s a unique scent for that as well. Fragrances are also used to make your mood better based on your emotions, personality, and aura. So, how about trying one for yourselves?",
    "Scent as a signature. For several years, fragrances have been known to be used by everyone as their unique signature. The fact that fragrances can be used as a mark of their presence and cleanliness traces back as one of the most prominent Sunnahs (practice) in Islam where history mentions evidence of our Holy Prophet wearing a unique ittar known as ‘Oud’. As the Holy Prophet walked past any road, everyone could know of his presence through his scent. So, if history and religion promote something so fascinating, why should you stop yourselves from using ittars?",
    "Your scent, your identity. At Fatir, we understand the special bond of humans and fragrances. For every person, there’s a vial of that LIQUID LUCK, containing the essence of the Lazarus pit. Limiting to a few options isn’t really our style. To convince you in layman’s terms, we just love to experiment with fragrances and your constant demands for uniqueness. This is why we introduce you to our special services of fragrance customization, where you present your demands, and our team of experts will recommend the perfect fragrance for you and even help you get a unique one for yourself.",
    "IF THAT WASN’T ENOUGH TO CONVINCE YOU, THEN THERE’S ONLY ONE WAY. COME AT OUR OFFICIAL STORE WHERE WE’LL BE ALL EARS TOWARDS ALL YOUR QUERIES. WE’RE PRETTY SURE WE CAN HELP YOU RESOLVE THE REST OF YOUR DOUBTS. WE’LL BE WAITING TO HEAR AND MEET YOU.",
  ];

  return (
    <div>
      <Header />
      <div className="bg-[#6a5a55] text-white py-16 mt-10">
        <h2 className="cursive--font text-center text-[40px] md:text-[60px] font-bold mb-8">
          ABOUT US
        </h2>
        <div className="max-w-5xl mx-auto space-y-8">
          {contentArray.map((section, index) => (
            <p
              key={index}
              className="text-lg md:text-xl leading-relaxed text-justify"
            >
              {section}
            </p>
          ))}
        </div>
      </div>
      <div
        className="container-fluid"
        style={{
          backgroundColor: '#f9f9f9',
          padding: '30px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundImage: 'url("https://img.freepik.com/premium-photo/arabian-oud-attar-perfume-agarwood-oil-fragrances-mini-bottle_926199-3065366.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.8,
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6 text-center" style={{ width: '100%' }}>
            <h1 className="mb-1 text-white" style={{ fontWeight: 'bold', fontSize: '28px' }}>Subscribe to Our Newsletter</h1>
            <p className="mb-2 text-white">Get all the latest offers and product updates sent to your inbox</p>

            <div className="input-group mb-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                aria-label="Email"
                aria-describedby="basic-addon2"
                style={{
                  borderRadius: '20px',
                  padding: '12px 20px',
                  fontSize: '16px',
                  width: 'calc(100% - 120px)',
                }}
              />
              <button
                className="btn btn-dark"
                type="button"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  padding: '12px 20px',
                  marginLeft: '10px',
                  width: '100px',
                }}
              >
                Subscribe
              </button>

            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
