export enum CommandCategory {
    Account = "Account",
    Transaction = "Transaction",
    Node = "Node",
    Task = "Task",
  }
  
  export interface KoiiCommand {
    label: string
    command: string
    category: CommandCategory
    description: string
  }
  
  export const koiiCommands: KoiiCommand[] = [
    {
      label: "Generate Key",
      command: "koii-keygen pubkey",
      category: CommandCategory.Account,
      description: "Generate a new Koii keypair",
    },
    {
      label: "Check Balance",
      command: "koii balance",
      category: CommandCategory.Account,
      description: "Check the balance of your Koii account",
    },
    {
      label: "Confirm Transaction",
      command: "koii confirm <TRANSACTION_SIGNATURE>",
      category: CommandCategory.Transaction,
      description: "Confirm a transaction on the Koii network",
    },
    {
      label: "Deploy Program",
      command: "koii program deploy <PROGRAM_FILEPATH>",
      category: CommandCategory.Task,
      description: "Deploy a program to the Koii network",
    },
    {
      label: "Create Task",
      command: "koii task create",
      category: CommandCategory.Task,
      description: "Create a new task on the Koii network",
    },
    // Add more Koii commands here as needed
  ]
  
  