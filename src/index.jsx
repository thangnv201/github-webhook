import ForgeUI, { Code, Heading, Fragment, Text, render, useState, GlobalPage, Head, Cell, Table, Link, Row } from "@forge/ui";
import { webTrigger, storage } from "@forge/api";

const App = () => {

  const [commits] = useState(storage.get("github-commit"));
  console.log(commits);
  const [trigger] = useState(webTrigger.getUrl("github-listener"));

  return (
    <Fragment>
      <Text>End point of plugin</Text>
      <Code text={trigger} language="shell" />
      <Heading>List Commit </Heading>
      <Table>
        <Head>
          <Cell>
            <Text>ID</Text>
          </Cell>
          <Cell>
            <Text>Repository</Text>
          </Cell>
          <Cell>
            <Text>Branch</Text>
          </Cell>
          <Cell>
            <Text>Message</Text>
          </Cell>
          <Cell>
            <Text>Time</Text>
          </Cell>
        </Head>
        {commits.map(commit => {
          return <Row>
            <Cell>
              <Text><Link href={commit.commit.url}>{commit.commit.id}</Link></Text>
            </Cell>
            <Cell>
              <Text>
                <Link href={commit.url}>{commit.repository}</Link>
              </Text>
            </Cell>
            <Cell>
              <Text>{commit.branch}</Text>
            </Cell>
            <Cell>
              <Text>{commit.commit.author.name}: " {commit.commit.message}"</Text>
            </Cell>
            <Cell>
              <Text>{commit.commit.timestamp}</Text>
            </Cell>
          </Row>
        })}
      </Table>
    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App />
  </GlobalPage>
);