### Basic ERD Spec ###

#### Info ####

* 4 Core logical objects avaliable
* Soft deletion is supported
* Internal assumption that task belongs to only 1 team member

#### Logical Objects ####

- Boards
	- id
	- label
	- groupId
	- createdAt
	- updatedAt
	- deletedAt
  
- Groups
	- id
	- name
	- kind

- Tasks
	- id
	- label
	- OwnerId
	- groupId
	- boardId
	- status
	- metadata
	- createdAt
	- updatedAt
	- deletedAt

- Team Members
	- id
	- emailAddress
	- password
	- createdAt
	- updatedAt
