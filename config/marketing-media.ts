export const developmentAreaFilm = {
  poster: "/assets/marketing/video/KMJ5_OfficialProjectFilm_Poster_v03.webp",
  sources: [
    {
      src: "/assets/marketing/video/KMJ5_OfficialProjectFilm_Mobile_v02.mp4",
      media: "(max-width: 767px)",
      type: "video/mp4",
    },
    {
      src: "/assets/marketing/video/KMJ5_OfficialProjectFilm_Web_v02.mp4",
      media: "(min-width: 768px)",
      type: "video/mp4",
    },
  ],
} as const;

export const developmentPhasesMedia = {
  desktop: "/assets/renders/exterior/KMJ5_DevelopmentArea_ArchitectFacade_Desktop_v02.webp",
  mobile: "/assets/renders/exterior/KMJ5_DevelopmentArea_ArchitectFacade_Mobile_v02.webp",
  alt: "Esti 3D építészeti látványterv a Komárom Marek József utcai prémium lakóépületről és parkosított kertjéről.",
} as const;

export const locationExperienceMedia = {
  desktop: "/assets/renders/exterior/KMJ5_Location_MonostoriBridge_Desktop_v01.webp",
  mobile: "/assets/renders/exterior/KMJ5_Location_MonostoriBridge_Mobile_v01.webp",
} as const;

export const earlyChoiceMedia = {
  desktop: "/assets/renders/exterior/KMJ5_EarlyChoice_BalconySunset_Desktop_v02.webp",
  mobile: "/assets/renders/exterior/KMJ5_EarlyChoice_BalconySunset_Mobile_v02.webp",
  alt: "Koncepciólátvány: tervezett erkély naplementés kilátással a parkosított lakókörnyezetre.",
} as const;
