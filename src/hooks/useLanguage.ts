import { useState, useEffect } from "react";

export type LanguageCode = "es" | "en";

export const translations = {
  es: {
    welcome_screen: {
      union: "Nuestra Unión",
      with_music: "Incluye música de fondo",
      open_btn: "Abrir Invitación",
      august_date: "7 de Setiembre de 2026",
    },
    hero: {
      wedding: "Nuestra Boda",
      subtitle: "Dános el honor de acompañarnos a celebrar nuestro Matrimonio Religioso, Civil, y el Bautizo & Primer Añito de Max Christian.",
      date: "LUNES • 7 SETIEMBRE • 2026",
      place: "CATEDRAL DE ABANCAY • LA FLORESTA DE FAVIO",
    },
    whatsapp: {
      tooltip: "Consultas por WhatsApp",
      default_msg: "¡Hola Melissa y Jhimy! 💍✨ Acabo de abrir su hermosa invitación virtual. ¡Qué emoción celebrar con ustedes su Matrimonio, el Bautizo y el 1er Añito de Max Christian!",
    },
    countdown: {
      title: "Cada Segundo Nos Acerca Más",
      subtitle: "Acompáñanos a iniciar la cuenta regresiva para nuestro gran día",
      completed_title: "¡LLEGÓ EL GRAN DÍA!",
      completed_subtitle: "Hoy celebramos nuestro amor y a nuestro amado Max Christian",
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
      save_the_date: "Reserva la Fecha",
      month_year: "Setiembre 2026",
      wedding_day_label: "Gran Día",
      friday: "Lunes",
      of: "de",
      cayma: "Abancay, Apurímac, Perú",
    },
    family: {
      blessing: "Con la Bendición de Dios y de nuestros Padres",
      title: "Nuestras Familias",
      quote: '"Así que no son ya más dos, sino una sola carne; por tanto, lo que Dios juntó, no lo separe el hombre" Mateo 19:6',
      bride_parents: "Padres de la Novia",
      groom_parents: "Padres del Novio",
      godparents: "Padrinos de Matrimonio",
    },
    our_story: {
      label: "Nuestra Historia",
      title: 'El Camino Hacia el "Sí"',
      quote: '"Así que no son ya más dos, sino una sola carne; por tanto, lo que Dios juntó, no lo separe el hombre" Mateo 19:6',
      milestone_1_title: "El Comienzo de Todo",
      milestone_1_text: "Un camino lleno de amor, complicidad y bendiciones.",
      milestone_2_title: "El Regalo Más Grande",
      milestone_2_text: "La bendición de nuestro amado hijo Max Christian, llenando de luz nuestras vidas.",
      milestone_3_title: "La Triple Celebración",
      milestone_3_text: "Celebramos nuestro Matrimonio Religioso y Civil, y el Bautizo & 1er Añito de Max Christian.",
    },
    events: {
      religious: "Misa Religiosa y Bautizo",
      sacred_vow: "El Voto Sagrado",
      reception: "Recepción y Celebración",
      celebration: "La Gran Celebración",
      time: "Hora",
      place: "Lugar",
      cayma: "Abancay, Apurímac, Perú",
      after_service: "En La Floresta de Favio",
      view_map: "Ver Mapa",
      calendar: "Calendario",
      church_view: "Vista General",
      loc_ceremony: "Ubicación de Ceremonia",
      loc_party: "Ubicación de Recepción",
      maps_title: "Ubicaciones & Mapas Integrados",
      maps_desc: "Haz clic en ver ubicación para abrir Google Maps y guiarte con facilidad.",
      view_route: "Ver Ruta en Maps",
    },
    schedule: {
      protocol: "Protocolo",
      title: "Cronograma del Evento",
      desc: "Cada instante de este gran día está preparado con profundo amor e ilusión.",
      event_1_title: "Misa Religiosa & Bautizo",
      event_1_desc: "Catedral de Abancay a las 02:00 p.m.",
      event_2_title: "Ceremonia Civil",
      event_2_desc: "En La Floresta de Favio a las 04:30 p.m.",
      event_3_title: "Recepción y Bienvenida",
      event_3_desc: "Llegada al local La Floresta de Favio.",
      event_4_title: "Primer Añito de Max Christian",
      event_4_desc: "Celebración especial de su 1er añito y pastel.",
      event_5_title: "Brindis & Vals",
      event_5_desc: "Brindis de honor y baile nupcial.",
      event_6_title: "Gran Fiesta",
      event_6_desc: "Música, cena y celebración familiar.",
    },
    dress_code: {
      etiquette: "Etiqueta",
      title: "Código de Vestimenta",
      desc: "Nos encantaría verlos lucir sus mejores galas para esta ocasión tan especial.",
      ladies: "Damas",
      ladies_sub: "Vestido Elegante / Formal",
      ladies_desc: "Vestidos largos. Agradecemos evitar el color blanco.",
      ladies_warning: "Evitar Blanco",
      gentlemen: "Caballeros",
      gentlemen_sub: "Traje Formal",
      gentlemen_desc: "Ropa elegante / Traje formal.",
      gentlemen_warning: "Traje Formal",
    },
    gifts: {
      tag: "Detalles de Aprecio",
      title: "Mesa de Regalos",
      desc: "Su presencia y bendición en nuestro día es el regalo más preciado. Si desean tener un detalle con nosotros, les brindamos estas opciones:",
      envelope: "Lluvia de Sobres",
      envelope_sub: "Tradición en Efectivo",
      envelope_desc: "Dispondremos de un cofre para depositar sus sobres de bendición en La Floresta de Favio.",
      bank: "Cuentas Bancarias",
      bank_sub: "Transferencia Directa",
      bcp: "Banco BCP Soles",
      interbank: "Interbank Soles",
      acct_num: "Nº Cuenta",
      cci_num: "Nº CCI",
    },
    rsvp: {
      tag: "Confirmación",
      title: "Confirmar Asistencia",
      desc: "Por favor, confírmanos tu presencia para recibirte con el mayor cariño.",
      success_title: "¡Confirmación Enviada!",
      success_desc: "Hemos generado tu mensaje y abierto WhatsApp. ¡Nos vemos el 7 de Setiembre!",
      resend: "Volver a enviar",
      name_label: "Nombres y Apellidos",
      name_placeholder: "Escribe tu nombre completo",
      guests_label: "Cantidad de Invitados (Pases)",
      guest_1: "1 Persona (Pase Individual)",
      guest_2: "2 Personas (Pase de Pareja)",
      guest_3: "3 Personas",
      guest_4: "4 Personas",
      guest_5: "5 Personas",
      msg_label: "Mensaje o Dedicatoria Especial",
      msg_placeholder: "Escribe tus mejores deseos para Melissa, Jhimy y Max Christian...",
      submit_btn: "Confirmar Asistencia vía WhatsApp",
    },
    footer: {
      love: "Amor Eterno",
      title: "Melissa & Jhimy",
      share_btn: "Compartir Invitación",
      copied: "¡Enlace Copiado!",
      tooltip_desc: "Copiar o compartir enlace de la invitación",
      rights: "Abancay, Perú | Todos los derechos reservados © 2026",
      designer_tag: "Invitaciones Virtuales & Diseño Gráfico",
      designer_creators: "Creado con amor por VAC Creative",
    },
    audio: {
      text_mute: "Silenciar Música",
      text_play: "Reproducir Música",
    }
  },
  en: {
    welcome_screen: {
      union: "Our Union",
      with_music: "Includes background music",
      open_btn: "Open Invitation",
      august_date: "September 7, 2026",
    },
    hero: {
      wedding: "Our Wedding",
      subtitle: "Give us the honor of accompanying us to celebrate our Wedding, Baptism & 1st Birthday of Max Christian.",
      date: "MONDAY • SEPTEMBER 7 • 2026",
      place: "CATEDRAL DE ABANCAY • LA FLORESTA DE FAVIO",
    },
    whatsapp: {
      tooltip: "Queries via WhatsApp",
      default_msg: "Hello Melissa and Jhimy! 💍✨ I have opened your virtual invitation. Excited to celebrate your Wedding, Baptism & 1st Birthday of Max Christian!",
    },
    countdown: {
      title: "Every Second Brings Us Closer",
      subtitle: "Join us in counting down to our big day",
      completed_title: "THE BIG DAY HAS ARRIVED!",
      completed_subtitle: "Today we celebrate our love and Max Christian",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      save_the_date: "Save the Date",
      month_year: "September 2026",
      wedding_day_label: "Celebration Day",
      friday: "Monday",
      of: "of",
      cayma: "Abancay, Peru",
    },
    family: {
      blessing: "With the blessing of God and our parents",
      title: "Our Families",
      quote: '"What therefore God hath joined together, let not man put asunder" Matthew 19:6',
      bride_parents: "Bride's Parents",
      groom_parents: "Groom's Parents",
      godparents: "Wedding Godparents",
    },
    our_story: {
      label: "Our Story",
      title: 'The Road to "I Do"',
      quote: '"What therefore God hath joined together, let not man put asunder" Matthew 19:6',
      milestone_1_title: "The Beginning",
      milestone_1_text: "A journey filled with love and faith.",
      milestone_2_title: "The Greatest Blessing",
      milestone_2_text: "With the arrival of our beloved son Max Christian.",
      milestone_3_title: "Triple Celebration",
      milestone_3_text: "Celebrating our Wedding, Baptism & 1st Birthday of Max Christian.",
    },
    events: {
      religious: "Religious Ceremony & Baptism",
      sacred_vow: "The Sacred Vow",
      reception: "The Reception & 1st Birthday",
      celebration: "The Grand Celebration",
      time: "Time",
      place: "Location",
      cayma: "Abancay, Peru",
      after_service: "At La Floresta de Favio",
      view_map: "View Map",
      calendar: "Calendar",
      church_view: "General View",
      loc_ceremony: "Ceremony Venue",
      loc_party: "Reception Venue",
      maps_title: "Locations & Integrated Maps",
      maps_desc: "Click to open Google Maps and guide you smoothly.",
      view_route: "View Route on Maps",
    },
    schedule: {
      protocol: "Protocol",
      title: "Event Schedule",
      desc: "Every moment of our special day is planned with love.",
      event_1_title: "Religious Ceremony & Baptism",
      event_1_desc: "At Catedral de Abancay at 02:00 p.m.",
      event_2_title: "Civil Ceremony",
      event_2_desc: "At La Floresta de Favio at 04:30 p.m.",
      event_3_title: "Reception",
      event_3_desc: "Welcome at La Floresta de Favio.",
      event_4_title: "Max Christian's 1st Birthday",
      event_4_desc: "Birthday cake and celebration.",
      event_5_title: "Toast & Waltz",
      event_5_desc: "Wedding dance and toast of honor.",
      event_6_title: "Grand Party",
      event_6_desc: "Dinner, music and joy.",
    },
    dress_code: {
      etiquette: "Etiquette",
      title: "Dress Code",
      desc: "We would love to see you wearing your best attire.",
      ladies: "Ladies",
      ladies_sub: "Formal Dress",
      ladies_desc: "Long dresses. Please avoid white color.",
      ladies_warning: "Avoid White",
      gentlemen: "Gentlemen",
      gentlemen_sub: "Formal Attire",
      gentlemen_desc: "Formal elegant attire.",
      gentlemen_warning: "Formal Attire",
    },
    gifts: {
      tag: "Details of Appreciation",
      title: "Gift Registry",
      desc: "Your presence is our best gift. If you wish to send a gift, options are available:",
      envelope: "Envelope Box",
      envelope_sub: "Cash Gift Option",
      envelope_desc: "A special box will be provided at La Floresta de Favio.",
      bank: "Bank Accounts",
      bank_sub: "Direct Transfer",
      bcp: "BCP Bank (Soles)",
      interbank: "Interbank (Soles)",
      acct_num: "Account No.",
      cci_num: "CCI No.",
    },
    rsvp: {
      tag: "RSVP",
      title: "Confirm Attendance",
      desc: "Please inform us of your attendance to welcome you with joy.",
      success_title: "Attendance Confirmed!",
      success_desc: "We opened WhatsApp with your confirmation.",
      resend: "Send again",
      name_label: "Full Name",
      name_placeholder: "e.g., Mr. and Mrs. Family",
      guests_label: "Guests Count",
      guest_1: "1 Person",
      guest_2: "2 People",
      guest_3: "3 People",
      guest_4: "4 People",
      guest_5: "5 People",
      msg_label: "Special Message",
      msg_placeholder: "Write your best wishes for Melissa, Jhimy & Max Christian...",
      submit_btn: "Confirm Attendance via WhatsApp",
    },
    footer: {
      love: "Eternal Love",
      title: "Melissa & Jhimy",
      share_btn: "Share Invitation",
      copied: "Link Copied!",
      tooltip_desc: "Copy or share invitation link",
      rights: "Abancay, Peru | All rights reserved © 2026",
      designer_tag: "Virtual Invitations & Graphic Design",
      designer_creators: "Created with love by VAC Creative",
    },
    audio: {
      text_mute: "Mute Music",
      text_play: "Play Music",
    }
  }
};

export function useLanguage() {
  const [lang, setLang] = useState<LanguageCode>("es");

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      const detected = (window.navigator.language || "es").slice(0, 2).toLowerCase();
      if (detected === "en") {
        setLang("en");
      } else {
        setLang("es");
      }
    }
  }, []);

  const t = (key: string, fallback?: string): string => {
    const parts = key.split(".");
    let current: any = translations[lang];

    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        // Fallback to Spanish translation
        let fallbackVal: any = translations["es"];
        for (const fPart of parts) {
          if (fallbackVal && typeof fallbackVal === "object" && fPart in fallbackVal) {
            fallbackVal = fallbackVal[fPart];
          } else {
            fallbackVal = null;
            break;
          }
        }
        return typeof fallbackVal === "string" ? fallbackVal : fallback || key;
      }
    }

    return typeof current === "string" ? current : fallback || key;
  };

  return { lang, t, setLang };
}
