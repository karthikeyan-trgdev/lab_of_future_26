import SEO from '../../components/common/SEO';
import '../../styles/pages/iframe-embed.css';

const IframeEmbed = ({ src, title }) => (
  <>
    <SEO title={`${title} — Lab of Future`} description={title} />

    <main className="iframe-embed-page">
      <iframe
        src={src}
        title={title}
        allow="fullscreen"
        loading="lazy"
        allowFullScreen
      />
    </main>
  </>
);

export default IframeEmbed;
