import { Text } from "@0xsequence/design-system";

export const Footer = () => {
  return (
    <footer className="homepage__footer">
      <Text>
        Want to learn more? Read the{" "}
        <a
          href={"https://github.com/ScreamingHawk/zk-where-in-the-world.git"}
          target="_blank"
          rel="noreferrer"
        >
          repo
        </a>
        !
      </Text>
    </footer>
  );
};
