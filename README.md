<p  align="center">
<img  width="100" height="100" src="https://i.postimg.cc/L6NPJzgv/new-favicon.png">
</p>

<h1 align="center" > Petroly Frontend Codebase</h1>

Petroly's first initiative frontend source codebase

---

## Table of Contents

<details>
<summary>Table of Contents</summary>
<ol>
<li>
<a href="#Project-Goal">Project Goal</a>
</li>
<li>
<a href="#Tech-Stack">Tech Stack</a>
</li>
<li>
<a href="#Getting-Started">Getting Started</a>
</li>
<details>
<summary><a href="#How-to-contribute">How to contribute?</a></summary>
<ul>
<li>
<a href="#Pull-Requests">Pull Requests</a>
</li>
<li>
<a href="#Issues">Opening Issues</a>
</li>
<li>
<a href="#Branches">Branches</a>
</li>
</ul>

</details>
<li>
<a href="#Roadmap">Roadmap</a>
</li>
<li>
<a href="#Acknowledgement">Acknowledgements</a>
</li>
<li>
<a href="#Contact">Contact</a>
</li>
</ol>
</details>

---

## Project Goal

Create a high-quality platform where all students share their knowledge and experiences in their KFUPM journeys

---

## Tech Stack

- Next.js (a React.js framework)
- react-bootstrap
- react-icons
- sass
- Apollo client for GraphQL

---

## Getting Started

- make sure to clone the Petroly backend repository in order to run the project
- download the python backend dependencies via your selected virtual environment option
  - for `anaconda` users, create a virtrual enviroenmnt `conda create --name envName` and then activate it `conda activate envName`
- run `python manage.py runserver` to run the backend project at port 8000 after activating your virtual environment
- run `npm install` to install required packages for the frontend
- run `npm run dev` to launch the frontend project on localhost 3000

## How to Contribute

To gurarantee a uniform maintenance of the project, contributors need to adhere to the following guidelines

#### Pull Requests

- It is recommended to contribute to targeted services in the `Projects` tab
- No direct pull requests to the master branch will be accepted under any circumstances
- Every pull request title shall confirm to the following paradigm `<PR-Type>[feature]: contribution summary`
  - `<PR-TYPE>`: bugfix, or enhancement
  - `[feature]`: the name of the branch, or the issue ID in case of a bugfix
- No empty-body pull request will be accepted
- please utilize tags and link your commit to the respective project in `Projects` tab
- Comments on your code are mandatory
- a screenshot or a video recording of the commit would be highly appreciated
- submitting off-scratch commits on issues labelled `on progress` will be ignored, please branch off the existing progress so that we can benefit from your efforts

#### Issues

- Provide the sequence to re-produce the issue you have faced (a video or screenshot would be appreciated)
- Provide the needed tags to your issue
- the issue title shall confirm to the following scheme: `[service-name]: issue summary`
  - `[service-name]`: the service name in the `Projects` tab and shall be in CamelCase
- failing to meet requirements will lead to rejecting the issue

#### Branches

- to minimize merge-conflicts, each contributor shall work on a separate branch with the following title scheme: `[@username]service-name`
  - `service-name` shall be in CamelCase, and included in the `Projects` tab
- only core-team members can merge branches to the master branch to ensure testing the code properly

## Roadmap

The Details of our targeted services are in the `Projects` tab of the repository

## Acknowledgements

Special thanks to everyone who has already participated in this project, and to those who are willing to further support us with their efforts. To find out more about the contributors, visit the `Insights` tab of the repository

## Contact

You can contact the core maintainers of the project through our official support email support@petroly.co

<br />
<div align="center"><i>We more than excited to see your amazing contributions to this project ;-)</i></div>
<br/>
<div align="center"><a href="#Table-of-Contents" >get to the top</a></div>
