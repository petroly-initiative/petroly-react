import { graphql } from "msw";

export const handlers = [
  graphql.query("Instructor", (req, res, ctx) => {
    return res(
      ctx.data({
        instructor: {
          id: "3",
          name: "Pizza",
          department: "SWE",
          profilePic:
            "https://res.cloudinary.com/petroly-initiative/image/upload/v1622359053/profile_pics/blank_profile",
          overall: 5,
          overallFloat: 5,
          gradingAvg: 100,
          personalityAvg: 100,
          teachingAvg: 100,
          evaluationSet: {
            count: 1,
            data: [
              {
                date: "2022-06-09T15:05:08.855740+00:00",
                id: "6",
                grading: "A_100",
                teaching: "A_100",
                personality: "A_100",
                gradingComment: "",
                teachingComment: "",
                personalityComment: "",
                course: "AAA123",
                term: 213,
                comment: "",
                __typename: "EvaluationType",
              },
            ],
            __typename: "EvaluationTypeConnection",
          },
          __typename: "InstructorType",
        },
      })
    );
  }),
  graphql.query("hasEvaluated", (req, res, ctx) => {
    return res(ctx.data({ hasEvaluated: false }));
  }),

  graphql.query("getDepartments", (req, res, ctx) => {
    return res(
      ctx.data({
        departmentList: [
          "AF",
          "AE",
          "ARE",
          "ARC",
          "CE",
          "CEM",
          "CHE",
          "CHEM",
          "COE",
          "CPG",
          "CRP",
          "ERTH",
          "EE",
          "ELI",
          "ELD",
          "FIN",
          "ISOM",
          "GS",
          "IAS",
          "ICS",
          "LS",
          "MATH",
          "MBA",
          "ME",
          "MGT",
          "PE",
          "PETE",
          "PHYS",
          "PSE",
          "SE",
        ],
      })
    );
  }),

  graphql.query("Instructors", (req, res, ctx) => {
    return res(
      ctx.data({
        instructors: {
          count: 1,
          data: [
            {
              id: "3",
              name: "Muhab",
              department: "SWE",
              overallFloat: 5,
              profilePic:
                "http://res.cloudinary.com/petroly-initiative/image/upload/v1622446329/instructors/profile_pics/Munteshari%20Obaidallah.jpg",
              evaluationSet: {
                count: 34,
                __typename: "EvaluationTypeConnection",
              },
              __typename: "InstructorType",
            },
          ],
          __typename: "InstructorTypeConnection",
        },
      })
    );
  }),

  
];
