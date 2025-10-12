import "../styles/globals.css";

export default function Testimonials() {
    const items = [
        {
            quote:
                "Desenvolvi isso aqui em uma noite olhando um tutorial de um cara de Moçambique. (estou com sono e fome)",
            author: "Marcelo Henrique",
            rate: "★★★★☆",
        },
        {
            quote: "O melhor labubu da região, se loco tio!",
            author: "Carmem Lucia",
            rate: "★★★★★",
        },
        {
            quote: "Fiz as personas, faz o site direito Marselo.",
            author: "Andrei",
            rate: "★★★☆☆",
        },
    ];

    return (
        <div className="page-inner-content">
            <div className="testimonials">
                {items.map((t, i) => (
                    <div key={i} className="testimonial">
                        <p>"</p>
                        <p>{t.quote}</p>
                        <p className="rate">{t.rate}</p>
                        <p>{t.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
