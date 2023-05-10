import { PromptPayload } from "@renderer/types";

export const initialComplexPrompts: PromptPayload[] = [
  {
    title: "Comprehensive Data Summary and Implication Analysis.",
    content:
      "Please summarize the main ideas in this data, identify any patterns or trends, and explain potential implications of these findings. Also, provide a concept map highlighting the key themes.",
    type: "system",
    userId: null,
    categoryId: null,
  },
  {
    title: "Controversial Points, Criticisms, and Evolving Information.",
    content:
      "Can you summarize the data, identify the top three controversial points, and provide some potential criticisms? Also, how might this information change over time?",
    type: "system",
    userId: null,
    categoryId: null,
  },
  {
    title: "Data Summarization, Bias Identification, and Visualization.",
    content:
      "What are the main ideas presented in this data, what questions does it raise, and can you identify and explain any biases present? Could you also help visualize this information with a diagram or infographic?",
    type: "system",
    userId: null,
    categoryId: null,
  },
  {
    title: "Understanding Data Complexity and Its Relation to Current Trends.",
    content:
      "Please provide a summary of this data, an explanation of the complexity in layman's terms, and a discussion of how this data relates to current trends or issues in its respective field. Also, what are some potential future developments related to this data?",
    type: "system",
    userId: null,
    categoryId: null,
  },
  {
    title: "Thematic Understanding and Practical Application of Data.",
    content:
      "What are the key themes in this data, how would they be understood by someone without domain-specific knowledge, and what are some potential applications or uses for this information? Could you also provide a concept map of the main ideas?",
    type: "system",
    userId: null,
    categoryId: null,
  },
];

export const initialSimplePrompts: PromptPayload[] = [
  {
    content: "Please summarize the main ideas presented in this data.",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "How could the data be interpreted from a [specific field] perspective?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content: "What are the top three controversial points in the data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content: "Provide a concept map highlighting the key themes in this data.",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "What are the main criticisms that could be made based on this data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "How would this data be understood by someone without domain-specific knowledge?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content: "What are the top three surprising insights in the data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content: "Can you identify any patterns or trends in the data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "What are the potential implications or impacts of the findings in this data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "How might the information in this data evolve or change over time?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content: "What questions are raised by the information in this data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content: "Identify and explain any biases present in this data.",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "What are some potential applications or uses for the information in this data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "What additional information or context might be helpful to fully understand this data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "What are the key areas of agreement and disagreement in this data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "How would you explain the complexity of this data in layman's terms?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content: "Can you help visualize the data with a diagram or infographic?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "What are some potential future developments related to this data?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "What is the most critical piece of information in this data and why?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
  {
    content:
      "How does this data relate to current trends or issues in its respective field?",
    type: "system",
    title: null,
    userId: null,
    categoryId: null,
  },
];
