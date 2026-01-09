// Storybook preview removed — using Playwright visual tests instead.
// Delete this file if you are sure you won't reintroduce Storybook.

// initialize pinia & load sample data into stores for stories
import { useSiteStore } from '../src/stores/useSiteStore'
import { useNavStore } from '../src/stores/useNavStore'
import { useProfileStore } from '../src/stores/useProfileStore'
import { useProjectsStore } from '../src/stores/useProjectsStore'
import { useArticlesStore } from '../src/stores/useArticlesStore'
import { useExperienceStore } from '../src/stores/useExperienceStore'
import { useTechStore } from '../src/stores/useTechStore'
import { useContactStore } from '../src/stores/useContactStore'

// import JSON data
import siteData from '../public/data/site.json'
import navData from '../public/data/nav.json'
import aboutData from '../public/data/about.json'
import projectsData from '../public/data/projects.json'
import articlesData from '../public/data/articles.json'
import experienceData from '../public/data/experience.json'
import techData from '../public/data/tech.json'
import contactData from '../public/data/contact.json'

const pinia = createPinia()
setActivePinia(pinia)
app.use(pinia)

// patch stores with sample data so stories render consistently
const site = useSiteStore();site.$patch(siteData)
const nav = useNavStore();nav.$patch({ items: navData })
const profile = useProfileStore();profile.$patch(aboutData)
const projects = useProjectsStore();projects.$patch({ items: projectsData })
const articles = useArticlesStore();articles.$patch({ items: articlesData })
const experience = useExperienceStore();experience.$patch({ items: experienceData })
const tech = useTechStore();tech.$patch({ categories: techData })
const contact = useContactStore();contact.$patch(contactData)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true }
}

export const decorators = [ (story) => story() ]
export const tags = ['autodocs'];
