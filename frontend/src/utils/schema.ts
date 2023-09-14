import { z } from "zod";

/* // string memory equityTokenName,
   // string memory equityTokenSymbol,
   // address[] memory recipients,
   // uint256[] memory amounts,
   // uint256 cliffTime,
   // uint256 vestingTime */

export const VestedPairFactorySchema = z.object({
	equityTokenName: z.string(),
	equityTokenSymbol: z.string(),
	recipients: z.string(),
	amounts: z.string(),
	cliffTime: z.coerce.number(),
	vestingTime: z.coerce.number(),
	equityTokenInitialSupply: z.coerce.number()
});

export type VestedPairFactoryPayload = z.infer<typeof VestedPairFactorySchema>;
