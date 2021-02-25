import { Flex } from "@fluentui/react-northstar";

interface Props {
  videochat_users: {
    user_id: number;
    name?: string;
  }[];
}

export const DisplayUsers: React.FC<Props> = ({ videochat_users }) => {
  return (
    <Flex>
      {videochat_users.map(({ user_id, name = "" }) => (
        <p key={user_id}>User {user_id}: {name}</p>
      ))}
    </Flex>
  )
};
