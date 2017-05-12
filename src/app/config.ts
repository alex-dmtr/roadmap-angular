const protocol = 'http';
const address = 'localhost:3000';

const apiPrefix = 'api';
export var apiUrls = {
  /**
   * /api/auth
   */
  login: () => '/auth',
  users: () => '/users',
  /**
   * /api/groups
   */
  groups: () => '/groups',

  /**
   * /api/group
   */
  group: () => '/group',
  joinGroup: (groupID: number, userID: number) => `/group/${groupID}/add/${userID}`,

  /**
   * /api/group/groupID
   * 
   * @param {Number} groupID The group's ID/
   * 
   * @returns {String} The URL/
   */
  groupById: (groupID: number) => `/group/${groupID}`,
  groupPost: (groupID: number, postID: number) => `/group/${groupID}/post/${postID}`,

  /**
   * For POST-ing posts to a certain group.
   * 
   * @param {Number} groupID The group's ID.
   * 
   * @returns {String} The URL.
   */
  groupPosts: (groupID: number) => `/group/${groupID}/post`,

  groupRemoveMember: (groupID: number, userID: number) => `/group/${groupID}/remove/${userID}`
};

// prepend protocol, address and apiPrefix to all urls
/*
  I kept using the "urls" object for IntelliSense.
*/
let oldUrls = {};
Object.keys(apiUrls).forEach(key => {
  oldUrls[key] = apiUrls[key];
});

Object.keys(oldUrls).forEach(key => {
  let newFunc = (...args: any[]) => {
    var baseUrl = oldUrls[key].apply(oldUrls, args);
    return `${protocol}://${address}/${apiPrefix}${baseUrl}`;
  };
  apiUrls[key] = newFunc;
});
