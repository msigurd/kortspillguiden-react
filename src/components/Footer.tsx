import { GitHubLogoIcon } from "@radix-ui/react-icons"

const Footer: React.FC = () => (
  <div className="text-center">
    <p>
      Tilbakemeldinger eller feil? Opprett et issue på&nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/msigurd/Kortspillguiden/issues"
        className="inline-flex align-top gap-0.5 underline"
      >
        <GitHubLogoIcon className="mt-1" />
        GitHub
      </a>
    </p>
    <br />
    <p>
      &copy; 2023-2024&nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/msigurd"
        className="underline"
      >
        Markus Midtlien Sigurdsen
      </a>
    </p>
  </div>
)

export default Footer
