export default function MapSection() {
    return (
        <div
            style={{
                width: 100,
                height: 80,
                borderRadius: 8,
                overflow: "hidden",
                marginLeft: 8,
            }}
        >
            <iframe
                title="Camper Café map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10499.375657401871!2d2.2945!3d48.8584!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdebdf0f6bf%3A0x8d93b37cdcf0a0a1!2sTour%20Eiffel!5e0!3m2!1ses!2sfr!4v1700000000000"
            />
        </div>
    );
}
