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

export const LINK_SUBSCRIPTION = gql`
	subscription($user_fingerprint: uuid!) {
		links(order_by: [{id: desc}], limit: 5) {
			name
			full
			short
			is_owned(args: {user_fingerprint: $user_fingerprint})
		}
	}
  `;
