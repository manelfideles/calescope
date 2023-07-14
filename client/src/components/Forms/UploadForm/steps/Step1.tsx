import { GridItem, Grid, Input } from '@chakra-ui/react';
import { CreatableSelect } from '../../../CreatableSelect';
import { toLower } from 'lodash';
import { useState, useMemo } from 'react';
import { useRPC } from '../../../../hooks/useRPC';
import { StepProps } from '../../../../utils/types';
import { FormInput } from '../../FormInput';

// TODO @CS-30:
// Implement Mapbox Search API support to display
// the inserted coordinates in the UploadForm component.
//
// MapBox Search API URL
// https://api.mapbox.com/search/searchbox/v1/reverse?longitude={LONGITUDE}&latitude={LATITUDE}&language=de&access_token={MAPBOX_TOKEN}

export const Step1 = ({ form }: StepProps) => {
  const [coordinateIsDisabled, setCoordinateIsDisabled] = useState(false);
  const { data: locationData, isLoading: isLoadingLocations } = useRPC({
    rpcName: 'search_locations_by_string',
    params: { search_term: '' },
  });

  const setLocationCoordinates = (v: any, onChange: any) => {
    onChange(v.label);
    if (v.__isNew__) {
      form.setValue('locationId', null);
      form.setValue('locationLongitude', '');
      form.setValue('locationLatitude', '');
      setCoordinateIsDisabled(false);
    } else {
      form.setValue('locationId', v.id);
      form.setValue('locationLongitude', v.coordinates?.[0]);
      form.setValue('locationLatitude', v.coordinates?.[1]);
      setCoordinateIsDisabled(true);
    }
    form.setValue('isNewLocation', coordinateIsDisabled);
  };

  const locationOptions = useMemo(
    () =>
      locationData?.features!.map(
        // @ts-ignore
        ({ geometry: { coordinates }, properties: { name, id } }) => ({
          label: name,
          value: toLower(name).replace(' ', '-'),
          coordinates,
          id,
        })
      ),
    [locationData]
  );

  return (
    <>
      <GridItem pr={5} borderRight='1px solid lightgray'>
        <FormInput
          name='locationName'
          label='Name'
          fieldError={form.formState.errors.locationName}
          isRequired
        >
          <CreatableSelect
            form={form}
            isLoading={isLoadingLocations}
            options={locationOptions}
            fieldName='locationName'
            placeholderText='Select a location'
            onChange={setLocationCoordinates}
            stepNumber={1}
          />
        </FormInput>
        <Grid templateColumns='repeat(2, 1fr)' gap={5} mt={5}>
          <GridItem>
            <FormInput
              name='locationLatitude'
              label='Latitude'
              fieldError={form.formState.errors.locationLatitude}
              isRequired
            >
              <Input
                id='locationLatitude'
                type='number'
                isDisabled={coordinateIsDisabled}
                {...form.register('locationLatitude', {
                  required: 'This field is required',
                })}
              />
            </FormInput>
          </GridItem>
          <GridItem>
            <FormInput
              name='locationLongitude'
              label='Longitude'
              fieldError={form.formState.errors.locationLongitude}
              isRequired
            >
              <Input
                id='locationLongitude'
                type='number'
                isDisabled={coordinateIsDisabled}
                {...form.register('locationLongitude', {
                  required: 'This field is required',
                })}
              />
            </FormInput>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97475.51224215205!2d-8.498675291997548!3d40.22886179733836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd22f9144aacd16d%3A0x634564477b42a6b9!2sCoimbra!5e0!3m2!1sen!2spt!4v1687520649197!5m2!1sen!2spt'
          width='100%'
          height='100%'
          loading='lazy'
        />
      </GridItem>
    </>
  );
};
