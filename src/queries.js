import gql from 'graphql-tag';

export const LINK_LIST = gql`
	query {
	  links(order_by: [{name: asc}]) {
		name,
		full,
		short
	  }
	}
  `;
export const ADD_LINK = gql`
	mutation ($name: String!, $full: String!, $short: String!) {
		insert_links_one(object: {full: $full, name: $name, short: $short}) {
			short
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
	subscription {
		links(order_by: [{id: desc}], limit: 5) {
			name,
			full,
			short
		}
	}
  `;
