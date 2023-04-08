import { AddIcon, Badge, Box, Button, Center, Fab, FlatList, Flex, Icon, IconButton, InfoIcon, Pressable, ScrollView, Text } from "native-base"
import { RFValue } from "react-native-responsive-fontsize"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { AddMachineType } from "../../components/AddMachineType"
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native'
import { DeleteMachineTypeDialog } from "../../components/DeleteMachineTypeDialog";
import { useMachineTypesSelector } from "../../state/selectors";
import { MachineType as IMachineType } from "../../../models";
import _ from 'lodash'

export const MachineTypesConfigurations = () => {
    const addState = useDisclosure()
    const machineTypes = useMachineTypesSelector()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                machineTypes.length ? (
                    <FlatList
                        data={machineTypes}
                        renderItem={({ item, index }) => <MachineType data={item} index={index} />}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <Center style={{ flex: 1 }}>
                        <InfoIcon size='10' color='gray.300' />
                        <Box my={RFValue(10)}>
                            <Text color='gray.600' fontSize='lg'>No Machine Type Added</Text>
                        </Box>
                        <Button size='lg' onPress={addState.open}>
                            Add Machine Type
                        </Button>
                    </Center>
                )
            }
            {
                machineTypes.length ? (
                    <Fab
                        placement="bottom-right"
                        size="lg"
                        onPress={addState.open}
                        icon={<AddIcon name="share" as="Entypo" />}
                        renderInPortal={false}
                        right={7} bottom={10}
                    />
                ) : null
            }
            <AddMachineType close={addState.close} isOpen={addState.isOpen} />
        </SafeAreaView>
    )
}

interface MachineTypeProps {
    data: IMachineType
    index: number
}

const MachineType = ({ data, index }: MachineTypeProps) => {
    return (
        <Box background='white' mx={3} mt={3} p={4} borderRadius='md' borderWidth={1} borderColor='gray.200'>
            <Icon as={Ionicons} name='construct-outline' size='lg' />
            <Box mt={3}>
                <Text fontWeight='bold' fontSize='lg'>{data.name}</Text>
            </Box>
            {
                data.attributes.map((attribute) => (
                    <Flex flexDirection='row' mt={2} alignItems='center' borderWidth={1} borderColor='gray.100' p={2} borderRadius='md' justifyContent='space-between'>
                        <Text>{attribute.name}</Text>
                        <Badge ml={2} colorScheme='blue'>{_.startCase(attribute.type)}</Badge>
                    </Flex>
                ))
            }

            <Flex alignItems='flex-end' mt={5}>
                <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <IconButton variant='subtle' backgroundColor='blue.600' icon={<Icon as={Ionicons} name='create-outline' size='sm' color='white' />} />
                    <DeleteMachineTypeDialog index={index} data={data} />
                </Flex>
            </Flex>
        </Box>
    )
}