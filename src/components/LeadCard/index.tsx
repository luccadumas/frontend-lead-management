import React from 'react';
import { Card, Header, Avatar, Row, Name, Info, Description, Price, PriceAccepted, Button, Divider, Icon } from './styles';
import type { LeadCardProps } from './types';
import LocationIcon from '@/assets/icons/location.svg?react';
import BriefcaseIcon from '@/assets/icons/briefcase.svg?react';
import PhoneIcon from '@/assets/icons/phone.svg?react';
import EmailIcon from '@/assets/icons/email.svg?react';
import { ListContainer, EmptyMessage } from './styles';
import type { LeadListProps } from '@/features/leads/LeadList/types';
import type { Lead } from '@/contexts/LeadsContext/types';

export const LeadCard: React.FC<LeadCardProps> = ({
  name, date, suburb, category, jobId, description, price, onAccept, onDecline, accepted, phone, email
}) => (
  <Card>
    <Header>
      <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
      <div>
        <Name>{name}</Name>
        <Info>{date}</Info>
      </div>
    </Header>
    <Divider />
    <Row>
      <Info><Icon><LocationIcon aria-label="Location icon" /></Icon>{suburb}</Info>
      <Info><Icon><BriefcaseIcon aria-label="Category icon" /></Icon>{category}</Info>
      <Info>
        <Icon></Icon>Job ID: {jobId}
      </Info>
      {accepted && (
        <Info>
          <PriceAccepted>${price.toFixed(2)} Lead Invitation</PriceAccepted>
        </Info>
      )}
    </Row>
    <Divider />
    {accepted && (
      <Row>
        {phone && (
          <Info>
            <Icon><PhoneIcon aria-label="Phone icon" /></Icon>
            <a href={`tel:${phone}`} aria-label={`Call ${phone}`}>{phone}</a>
          </Info>
        )}
        {email && (
          <Info>
            <Icon><EmailIcon aria-label="Email icon" /></Icon>
            <a href={`mailto:${email}`} aria-label={`Send email to ${email}`}>{email}</a>
          </Info>
        )}
      </Row>
    )}
    <Description>{description}</Description>
    {!accepted && (
      <Row>
        <Button primary onClick={onAccept}>Accept</Button>
        <Button onClick={onDecline}>Decline</Button>
        <Price>${price.toFixed(2)} <span>Lead Invitation</span></Price>
      </Row>
    )}
  </Card>
);

export const LeadList: React.FC<LeadListProps> = ({ leads, status, onAccept, onDecline }) => {
  const filteredLeads = leads.filter((lead: Lead) => lead.status === status);
  return (
    <ListContainer>
      {filteredLeads.length === 0 ? (
        <EmptyMessage>
          {status === 'invited'
            ? 'No invited leads at this time.'
            : 'No leads accepted at this time.'}
        </EmptyMessage>
      ) : (
        filteredLeads.map((lead: Lead) => (
          <LeadCard
            key={lead.id}
            name={lead.name}
            date={lead.date}
            suburb={lead.suburb}
            category={lead.category}
            jobId={lead.jobId}
            description={lead.description}
            price={lead.price}
            onAccept={() => onAccept(lead)}
            onDecline={() => onDecline(lead)}
            accepted={lead.accepted}
            phone={lead.phone}
            email={lead.email}
          />
        ))
      )}
    </ListContainer>
  );
}; 