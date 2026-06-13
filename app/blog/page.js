import Container from '../../components/Container';
import Section from '../../components/Section';
import BlogList from '../../components/BlogList';
import { getAllPosts } from '../../lib/posts';

export const metadata = {
  title: 'Blog | Nitheesh Prahalath',
  description: 'Writing about what I learn',
};

export default function BlogPage(){
  const posts = getAllPosts();

  return (
    <Container>
      <Section> 
        <h1 style={{fontsize: '32px', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e'}}>
          Blog
          </h1>
          <p style={{color:'#8892b0', marginBottom:'40px'}}>
            Writing about what I'm Learning, one post at a time.
          </p>
          <BlogList posts={posts}/>
      </Section>
    </Container>
  )
}
