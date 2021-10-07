
# End points

**USER**


| Method | Link |

- |Post |`http://127.0.0.1:3700/api/users/save`|
- Return: status, code and user
- |Post |`http://127.0.0.1:3700/api/users/login`|
- Return: status, code and Json web token
- |Post |`http://127.0.0.1:3700/api/users/upload`|
- Require: JWT and image to update
- Return: status, code and user
- |Put |`http://127.0.0.1:3700/api/users/update`|
- Require: JWT and data to update
- Return: status, code and user updated
- |Get |`http://127.0.0.1:3700/api/users/getUsers`|
- Return: status, code, and list of all users
- |Get |`http://127.0.0.1:3700/api/users/getUser/:id`|
- Return: status, code and user
- |Get |`http://127.0.0.1:3700/api/users/avatar/:fileName`|
- Return: status, code and binary image
  
  

**Posts - Incomplete**


| Method | Link |

- - [x] |Post |`http://127.0.0.1:3700/api/portfolio/save`|
- Require: JWT and data to create
- Return: status, code and project
- - [ ] |Delete |`http://127.0.0.1:3700/api/portfolio/delete:id`|
- Require: JWT and data id
- Return: status, code and project deleted
- - [ ] |Put |`http://127.0.0.1:3700/api/portfolio/update`|
- Require: JWT and data to update
- Return: status, code and project updated
- - [ ] |Post |`http://127.0.0.1:3700/api/portfolio/upload`|
- Require: JWT and image to update
- Return: status, code and project
- - [x] |Get |`http://127.0.0.1:3700/api/portfolio/getPortfolios`|
- Return: status, code, and list of all projects
- - [x] |Get |`http://127.0.0.1:3700/api/portfolio/getPortfolio/:id`|
- Return: status, code and project
- - [x] |Get |`http://127.0.0.1:3700/api/portfolio/getImage/:fileName`|
- Return: status, code and binary image
  
  

**Blog - Incomplete**


| Method | Link |

- - [ ] |Post |`http://127.0.0.1:3700/api/blog/save`|
- - [ ] |Delete |`http://127.0.0.1:3700/api/blog/delete:id`|
- - [ ] |Put |`http://127.0.0.1:3700/api/blog/update`|
- - [ ] |Post |`http://127.0.0.1:3700/api/blog/upload`|
- - [ ] |Get |`http://127.0.0.1:3700/api/blog/getBlogs`|
- - [ ] |Get |`http://127.0.0.1:3700/api/blog/getBlog/:id`|
- - [ ] |Get |`http://127.0.0.1:3700/api/blog/getImage/:fileName`|
