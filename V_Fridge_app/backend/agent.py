from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain.agents import AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents.format_scratchpad.openai_tools import (
    format_to_openai_tool_messages,
)
from langchain.agents.output_parsers.openai_tools import OpenAIToolsAgentOutputParser
from database import collection, update
from dotenv import load_dotenv
import os

# Load environment variables from .env file
os.environ["TAVILY_API_KEY"] = "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"
api_key = os.environ.get("OPENAI_API_KEY")

# make tools
search = TavilySearchResults(max_results=2)

# make the agent able to manipulate the db

@tool 
def get_fridge_tool():
    '''
    This will return what the user has in their fridge at the current moment, explaining what they can use for cooking.
    '''
    return collection.find_one({"_id": 0})

@tool
def update_tool(changes):
    '''
    given the changes to be made in a JSON format of {name: change_amount}, if the amount is negative, that is okay, just input it into the function and itll work out and update the count.
    '''
    return update(changes)


tools = [search, get_fridge_tool, update_tool]

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are very powerful food assistant, you have access to your users fridge as well as access to the web to search for recipies, you do this without using markdown or any other typesetting language.",
        ),
        ("user", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ]
)

llm = ChatOpenAI(api_key=api_key, model="gpt-4o-mini")

llm_with_tools = llm.bind_tools(tools)

agent = (
    {
        "input": lambda x: x["input"],
        "agent_scratchpad": lambda x: format_to_openai_tool_messages(
            x["intermediate_steps"]
        ),
    }
    | prompt
    | llm_with_tools
    | OpenAIToolsAgentOutputParser()
)

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

#print(agent_executor.invoke({"input":"check my fridge and give me some recipies i can make to eat using all of the ingredients I have"}))