import { GitHubLogoIcon } from "@radix-ui/react-icons"

const Footer: React.FC = () => (
  <div className="text-center">
    <p>
      Tilbakemeldinger eller feil? Ta kontakt på&nbsp;
      <a href="mailto:markus@kortspillguiden.no" className="underline">
        markus@kortspillguiden.no
      </a>
      &nbsp;eller opprett et issue på&nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/msigurdsen/Kortspillguiden.no"
        className="inline-flex align-top gap-0.5 underline"
      >
        <GitHubLogoIcon className="mt-1" />
        GitHub
      </a>
    </p>
    <br />
    <p>
      &copy; 2023&nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/markus-midtlien-sigurdsen-14363b291"
        className="underline"
      >
        Markus Midtlien Sigurdsen
      </a>
    </p>
  </div>
)

export default Footer
