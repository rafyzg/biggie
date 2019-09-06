### Basic ERD Spec ###

#### Info ####

* 4 Core logical objects avaliable
* Soft deletion is supported
* Internal assumption that task belongs to only 1 team member

#### Logical Objects ####

-Folders
	- id
	- label
	-createdAt
	-updatedAt

- Boards
	- id
	- label
	- folderId
	- createdAt
	- updatedAt
  
- Groups
	- id
	- name
	- boardId
	- createdAt
	- updatedAt

- Tasks
	- id
	- label
	- status
	- metadata
	- teammemberId
	- groupId
	- createdAt
	- updatedAt

- Team Members
	- id
	- emailAddress
	- password
	- createdAt
	- updatedAt
