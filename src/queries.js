import gql from 'graphql-tag';

export const ADD_LINK = gql`
	mutation InsertLink($name: String!, $full: String!, $short: String!) {
		insert_links_one(object: {full: $full, name: $name, short: $short}) {
			id
		}
	}
`;
export const REMOVE_LINK = gql`
	mutation($short: String!) {
	  delete_links(where: { short: { _eq: $short } }) {
		affected_rows
	  }
	}
  `;

// Note: currently Heroku is running latest Hasura 1.2.1
// as of 1.3.0-beta.1, hasura_session will be pulled automatically from the session header
// https://hasura.io/docs/1.0/graphql/manual/schema/computed-fields.html#add-computed-field
export const LINK_SUBSCRIPTION = gql`
	subscription($order_by: [links_order_by!], $limit: Int!, $user_fingerprint: String!) {
		links(order_by: $order_by, limit: $limit) {
			name
			full
			short
			is_owned(args: { hasura_session: $user_fingerprint })
		}
	}
  `;
