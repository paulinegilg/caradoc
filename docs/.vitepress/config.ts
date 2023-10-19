import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    ignoreDeadLinks: true,
    title: "CaraDoc",
    description: "Formations et documentations sur le web",
    locales: {
        fr: {
            label: 'Français',
            lang: 'fr',
            link: '/fr/',
            themeConfig: {
                // https://vitepress.dev/reference/default-theme-config
                nav: [
                    { text: 'Home', link: '/fr/' },
                    { text: "Ressources", link: '/fr/ressources' },
                    { text: 'À propos', link: '/fr/about'},
                    { text: 'Contact', link: '/fr/contact' }
                ],

                sidebar: [
                    /*{ text: "Protéger les données personnelles en conformité avec le RGPD", items: [
                            { text: "Introduction", link: '/fr/rgpd/'},
                            { text: "Qu'est-ce qu'une donnée personnelle ?", link: '/fr/rgpd/definition-donnee-personnelle'},
                            { text: "Pourquoi protéger les données&nbsp;?", link: '/fr/rgpd/pourquoi-proteger-les-donnees'},
                            { text: "Historique de la protection des données personnelles", link: '/fr/rgpd/historique-protection-donnees-personnelles'},
                            { text: "Traitement, responsable de traitement et finalité", link: '/fr/rgpd/definition-traitement-responsable-finalite'},
                            { text: "Champ d'application du RGPD", link: '/fr/rgpd/champ-d-application'},
                            { text: "Bases légales", link: '/fr/rgpd/bases-legales'},
                            { text: "Consentement", link: '/fr/rgpd/consentement'},
                            { text: "Minimisation des données", link: '/fr/rgpd/minimisation-donnees'},
                            { text: "Durée de conservation des données", link: '/fr/rgpd/duree-conservation'},
                            { text: "Information et droits des personnes", link: '/fr/rgpd/information-droits-des-personnes'},
                            { text: "Dark patterns", link: '/fr/rgpd/dark-patterns'},
                            { text: "Cookies", link: '/fr/rgpd/cookies'},
                            { text: "Mesure de fréquentation d'un site ou d'une application", link: '/fr/rgpd/frequentation'},
                            { text: "Sécurité des données", link: '/fr/rgpd/securite'},
                            { text: "Données sensibles", link: '/fr/rgpd/donnees-sensibles'},
                            { text: "Transfert de données hors UE", link: '/fr/rgpd/transfert-hors-ue'},
                            { text: "Sanctions en cas de manquement au RGPD", link: '/fr/rgpd/sanctions'},
                            { text: "Enjeux et opportunités du RGPD", link: '/fr/rgpd/enjeux-opportunites-rgpd'},
                            { text: "Le RGPD en gestion de projets web", link: '/fr/rgpd/le-rgpd-en-gestion-de-projets-web'},
                            { text: "Webographie et ressources à explorer", link: '/fr/rgpd/webographie-et-ressources-a-explorer'}
                        ]
                    },*/
                    {
                        text: "Accessibilité",
                        items: [
                            { text: "Introduction", link: '/fr/accessibilite/' },
                            { text: "Qu'est-ce que l'accessibilité ?", link: '/fr/accessibilite/qu-est-ce-que-l-accessibilite' },
                            { text: "Pourquoi l'accessibilité est importante ?", link: '/fr/accessibilite/pourquoi-l-accessibilite-est-importante' },
                            { text: "Les différentes formes de handicap", link: '/fr/accessibilite/les-differents-handicaps'},
                            { text: "Les technologies d'assistance", link: '/fr/accessibilite/les-technologies-d-assistance' },
                            { text: "Couleurs et contraste", link: '/fr/accessibilite/couleurs-et-contraste' },
                            { text: "Images", link: '/fr/accessibilite/images' },
                            { text: "Vidéo et audio", link: '/fr/accessibilite/video-et-audio' },
                            { text: "Animations", link: '/fr/accessibilite/animations' },
                            { text: "Contenus textuels", link: '/fr/accessibilite/contenus-textuels' },
                            { text: "HTML et ARIA", link: '/fr/accessibilite/html-et-aria' },
                            { text: "Formulaires", link: '/fr/accessibilite/formulaires' },
                            { text: "Référentiels et lois", link: '/fr/accessibilite/referentiels-et-lois' },
                            { text: "Tester l'accessibilité", link: '/fr/accessibilite/tester-l-accessibilite' },
                            { text: "L'accessibilité en projet web", link: '/fr/accessibilite/accessibilite-en-projet-web' },
                            { text: "Conclusion", link: '/fr/accessibilite/conclusion' },
                            { text: "Webographie et ressources à explorer", link: '/fr/accessibilite/webographie-et-ressources-a-explorer' }
                        ]
                    },
                    { text: "Améliorer la qualité des sites web", items: [
                            { text: "Introduction", link: '/fr/qualite-web/'},
                            { text: "Définition", link: '/fr/qualite-web/definition'},
                            { text: "Établir des critères de qualité", link: '/fr/qualite-web/etablir-des-criteres-de-qualite'},
                            { text: "Référentiel Opquast", link: '/fr/qualite-web/referentiel-opquast'},
                            { text: "Intégrer la qualité dans un projet web", link: '/fr/qualite-web/integrer-la-qualite-dans-un-projet-web'},
                            { text: "Contextes utilisateurs", link: '/fr/qualite-web/contextes-utilisateurs'},
                            { text: "Coût de non qualité", link: '/fr/qualite-web/cout-de-non-qualite'},
                            { text: "Indicateurs de qualité", link: '/fr/qualite-web/indicateurs-de-qualite'},
                            { text: "Conclusion", link: '/fr/qualite-web/conclusion'},
                            { text: "Webographie et ressources à explorer", link: '/fr/qualite-web/webographie-et-ressources-a-explorer'}
                        ]
                    },
                    { text: "Ressources", link: '/fr/ressources' },
                    { text: "Contact", link: '/fr/contact' },
                    { text: "Signaler une erreur ou un bug", link: '/fr/bug' },
                    { text: "À propos", link: '/fr/about' },
                    { text: "Mentions légales et données personnelles", link: '/fr/legal'}
                ],

                outlineTitle: 'Sur cette page',
                appearanceTitle: 'Thème',

                lastUpdatedText: 'Updated Date',

                langMenuLabel: 'test',

                docFooter: {
                    prev: 'Page précédente',
                    next: 'Page suivante'
                },

                footer: {
                    message: '<a href="/fr/legal">Mentions légales et données personnelles</a>',
                    copyright: 'Contenus sous licence CC BY-SA 4.0'
                },

                search: {
                    provider: 'local',
                    options: {
                        locales: {
                            fr: {
                                placeholder: 'Rechercher',
                                translations: {
                                    button: {
                                        buttonText: 'Rechercher',
                                        buttonAriaLabel: 'Rechercher'
                                    },
                                    modal: {
                                        noResultsText: 'Aucun résultat trouvé pour',
                                        resetButtonTitle: 'Annuler la recherche',
                                        footer: {
                                            selectText: 'pour sélectionner',
                                            navigateText: 'pour naviguer',
                                            closeText: 'pour fermer'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

                returnToTopLabel: 'Retourner en haut',
                darkModeSwitchLabel: 'Thème'
            }
        },
        en: {
            label: 'English',
            lang: 'en',
            link: '/en/',
            themeConfig: {
                // https://vitepress.dev/reference/default-theme-config
                nav: [
                    { text: 'Home', link: '/en/' },
                    { text: 'About', link: '/en/about'},
                    { text: 'Contact', link: '/en/contact' }
                ],

                sidebar: [
                    { text: "Protect personal data in compliance with the GDPR", items: [
                            { text: "Introduction", link: '/en/gdpr/'},
                            { text: "What is personal data?", link: '/en/gdpr/what-is-personal-data'},
                            { text: "Why protect personal data?", link: '/en/gdpr/why-protect-data'},
                            { text: "Brief history of personal data protection", link: '/en/gdpr/brief-history-of-personal-data-protection'},
                            { text: "Definitions around data processing", link: '/en/gdpr/definitions-around-data-processing'},
                            { text: "The scope of the GDPR", link: '/en/gdpr/the-scope-of-the-gdpr'},
                            { text: "Lawful basis for data processing", link: '/en/gdpr/lawful-basis-for-processing'},
                            { text: "Consent", link: '/en/gdpr/consent'},
                            { text: "Data minimization", link: '/en/gdpr/data-minimization'},
                            { text: "How long should data be kept?", link: '/en/gdpr/data-retention-period'},
                            { text: "The right to be informed", link: '/en/gdpr/right-to-be-informed'},
                            { text: "Sensitive data", link: '/en/gdpr/sensitive-data'},
                            { text: "Data transfers outside the EU", link: '/en/gdpr/transfers-outside-eu'},
                            { text: "Fines and penalties", link: '/en/gdpr/fines-and-penalties'},
                            { text: "Challenges and opportunities of the GDPR", link: '/en/gdpr/challenges-and-opportunities'},
                            { text: "Webography and resources to explore", link: '/en/gdpr/webography-and-resources-to-explore'}
                        ]
                    },
                    { text: "Contact", link: '/en/contact' },
                    { text: "Report an error or a bug", link: '/en/bug' },
                    { text: "About", link: '/en/about' },
                    { text: "Legal notice and personal data", link: '/en/legal'}
                ],

                footer: {
                    message: '<a href="/en/legal">Legal notice and personal data</a>',
                    copyright: 'Contents under licence CC BY-SA 4.0'
                }
            }
        },
    },
    themeConfig: {
        search: {
            provider: 'local',
            options: {
                locales: {
                    fr: {
                        placeholder: 'Rechercher',
                        translations: {
                            button: {
                                buttonText: 'Rechercher',
                                buttonAriaLabel: 'Rechercher'
                            },
                            modal: {
                                noResultsText: 'Aucun résultat trouvé pour',
                                resetButtonTitle: 'Annuler la recherche',
                                footer: {
                                    selectText: 'pour sélectionner',
                                    navigateText: 'pour naviguer',
                                    closeText: 'pour fermer'
                                }
                            }
                        }
                    }
                }
            }
        },
    }
})
