export const developmentAreaFilm = {
  poster: "/assets/renders/exterior/KMJ5_Exterior_IntegratedDevelopment_v01.webp",
  sources: [
    {
      src: "/assets/marketing/video/KMJ5_DevelopmentArea_MoodFilm_Mobile_v02.mp4",
      media: "(max-width: 767px)",
      type: "video/mp4",
    },
    {
      src: "/assets/marketing/video/KMJ5_DevelopmentArea_MoodFilm_Desktop_v02.mp4",
      media: "(min-width: 768px)",
      type: "video/mp4",
    },
  ],
} as const;

export const developmentPhasesMedia = {
  background: "/assets/renders/construction/KMJ5_DevelopmentPhases_ConstructionMood_v01.webp",
} as const;
