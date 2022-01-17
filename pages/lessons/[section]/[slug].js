import { useContext, useEffect } from "react";
import { getLesson, getLessons } from "../../../data/lesson";
import Corner from "../../../components/corner";
import { Context } from "../../../context/headerContext";

// export const meta = (routeData) => {
//   return {
//     title: `${routeData.data.section} – ${routeData.data.title}`,
//     description: routeData.data.attributes.description,
//   };
// };

export default function LessonSlug({ post }) {
  const [_, setHeader] = useContext(Context);
  useEffect(() => {
    setHeader({
      section: post.section,
      title: post.title,
      icon: post.icon,
    });
    return () => setHeader({});
  }, []);

  return (
    <div className="lesson-container">
      <div className="lesson">
        <div
          className="lesson-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="lesson-links">
          {post.prevSlug ? (
            <a href={post.prevSlug} className="prev">
              ← Previous
            </a>
          ) : null}
          {post.nextSlug ? (
            <a href={post.nextSlug} className="next">
              Next →
            </a>
          ) : null}
        </div>
      </div>
      <Corner />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = await getLesson(params.section, params.slug);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const sections = await getLessons();
  const lessons = sections.map((section) => section.lessons);
  const slugs = lessons.flat().map((lesson) => lesson.fullSlug);

  return { paths: slugs, fallback: false };
}
