import { contactDetails } from '../data/siteContent';

export default function FloatingWhatsAppButton() {
  const whatsappUrl = `https://wa.me/${contactDetails.whatsapp}?text=Hi, I need help with loan settlement. Can you assist?`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all hover:bg-emerald-600 hover:shadow-xl active:scale-95 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg
        className="h-8 w-8 sm:h-7 sm:w-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.935 1.22c-1.545.93-2.732 2.37-3.408 3.98-.805 2.02-.938 4.18-.37 6.15.608 1.97 1.725 3.75 3.276 5.103 1.552 1.353 3.532 2.288 5.657 2.666 2.125.378 4.365.265 6.38-.367 1.585-.489 3.02-1.32 4.18-2.396 1.16-1.076 2.02-2.39 2.51-3.8.493-1.41.634-2.91.455-4.35-.218-1.844-.962-3.577-2.148-4.977-1.186-1.4-2.78-2.41-4.54-2.894-1.76-.484-3.659-.418-5.42.2" />
      </svg>
    </a>
  );
}
