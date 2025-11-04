import { Carousel } from '@mantine/carousel';
import '../Stylesheets/carousel.css'
import { IconArrowLeft, IconArrowRight, IconQuote } from '@tabler/icons-react';

function QouteCar() {
    const motivationalQuotes = [
        {
            quote: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney"
        },
        {
            quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            quote: "Don't be afraid to give up the good to go for the great.",
            author: "John D. Rockefeller"
        },
        {
            quote: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            quote: "It is during our darkest moments that we must focus to see the light.",
            author: "Aristotle"
        }
    ];

    return (
        <div className='carousel-container'>
            <Carousel 
                withIndicators 
                height={250} 
                loop 
                nextControlIcon={<IconArrowRight size={20} />}
                previousControlIcon={<IconArrowLeft size={20} />}
                classNames={{
                    root: 'carousel-root',
                    control: 'carousel-control',
                    indicator: 'carousel-indicator'
                }}
            >
                {motivationalQuotes.map((item, index) => (
                    <Carousel.Slide key={index}>
                        <div className="quote-slide">
                            <div className="quote-icon">
                                <IconQuote size={24} />
                            </div>
                            <blockquote className="quote-text">
                                "{item.quote}"
                            </blockquote>
                            <cite className="quote-author">— {item.author}</cite>
                        </div>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
}

export default QouteCar;